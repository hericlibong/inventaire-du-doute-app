import { access, cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';

const appRoot = resolve(import.meta.dirname, '..');
const sourceRoot = resolve(process.env.INVENTAIRE_SOURCE ?? resolve(appRoot, '..', 'MuseumAtribution'));
const source = resolve(sourceRoot, 'data', 'exports', 'web');
const sourceStatic = resolve(sourceRoot, 'web', 'static');
const staticRoot = resolve(appRoot, 'static');
const target = resolve(staticRoot, 'data');
const artworkTarget = resolve(staticRoot, 'oeuvres');
const portraitTarget = resolve(staticRoot, 'portraits');
const popNoticeBaseUrl = 'https://pop.culture.gouv.fr/notice/joconde/';
const sourceRepository = 'hericlibong/inventaire-du-doute';

const rootFiles = [
	'artistes.json',
	'corpus_maitres.json',
	'images_index.json',
	'musees.json',
	'niveaux.json',
	'portraits.json',
	'provenance.json',
	'registre.json',
	'territoires.json'
];

async function json(path) {
	return JSON.parse(await readFile(path, 'utf8'));
}

function compareText(left, right) {
	if (left < right) return -1;
	if (left > right) return 1;
	return 0;
}

function requireString(value, label) {
	if (typeof value !== 'string' || value.length === 0) {
		throw new Error(`${label} est absent ou invalide.`);
	}
	return value;
}

function requireRelativeMediaPath(value, directory, label, allowLeadingSlash = false) {
	const declaredPath = requireString(value, label);
	if (declaredPath.startsWith('/') && !allowLeadingSlash) {
		throw new Error(`${label} doit être un chemin relatif.`);
	}
	const relativePath = declaredPath.startsWith('/') ? declaredPath.slice(1) : declaredPath;
	const segments = relativePath.split('/');
	if (
		segments[0] !== directory ||
		segments.length !== 2 ||
		segments.some((segment) => segment === '' || segment === '.' || segment === '..')
	) {
		throw new Error(`${label} ne désigne pas un fichier du répertoire ${directory}.`);
	}
	return relativePath;
}

async function requireSourceFile(path, label) {
	try {
		await access(path);
	} catch {
		throw new Error(`${label} est absent du dépôt source.`);
	}
}

await rm(target, { recursive: true, force: true });
await mkdir(target, { recursive: true });

for (const file of rootFiles) {
	await cp(resolve(source, file), resolve(target, file));
}
await cp(resolve(source, 'oeuvres'), resolve(target, 'oeuvres'), { recursive: true });

const artistes = await json(resolve(target, 'artistes.json'));
const imagesIndex = await json(resolve(target, 'images_index.json'));
const musees = await json(resolve(target, 'musees.json'));
const sourcePortraits = await json(resolve(target, 'portraits.json'));
const provenance = await json(resolve(target, 'provenance.json'));
const corpus = await json(resolve(target, 'corpus_maitres.json'));

if (!Array.isArray(artistes.artistes) || artistes.artistes.length === 0) {
	throw new Error('Le répertoire des artistes est vide ou invalide.');
}
if (new Set(artistes.artistes.map(({ slug }) => slug)).size !== artistes.artistes.length) {
	throw new Error('Les slugs des artistes ne sont pas uniques.');
}
if (!corpus.unites || !provenance.version_donnee) {
	throw new Error('Les métadonnées du corpus ou de provenance sont incomplètes.');
}
if (!imagesIndex || Array.isArray(imagesIndex) || typeof imagesIndex !== 'object') {
	throw new Error("L'index des reproductions est absent ou invalide.");
}
if (!sourcePortraits || Array.isArray(sourcePortraits) || typeof sourcePortraits !== 'object') {
	throw new Error("L'index des portraits est absent ou invalide.");
}

const artistSlugs = new Set(artistes.artistes.map(({ slug }) => slug));
const artistsByName = new Map();
for (const artist of artistes.artistes) {
	const name = requireString(artist.nom, 'Un nom artiste');
	if (artistsByName.has(name)) {
		throw new Error(`Le nom artiste ${name} n'est pas unique.`);
	}
	artistsByName.set(name, artist);
}
const museumCodes = new Set();
for (const museum of musees) {
	const code = requireString(museum.code_museofile, 'Un code Muséofile');
	if (museumCodes.has(code)) {
		throw new Error(`Le code Muséofile ${code} n'est pas unique.`);
	}
	museumCodes.add(code);
}

const sourceCategoryTotals = artistes.totaux?.familles_notices;
if (!sourceCategoryTotals || typeof sourceCategoryTotals !== 'object') {
	throw new Error('Les totaux par catégorie du corpus sont absents ou invalides.');
}

const categoryCodes = Object.keys(sourceCategoryTotals).sort(compareText);
if (categoryCodes.length !== 8) {
	throw new Error(`Le corpus doit contenir huit catégories, ${categoryCodes.length} trouvées.`);
}

const categoryLabels = new Map();
for (const artist of artistes.artistes) {
	for (const category of artist.familles ?? []) {
		if (!categoryCodes.includes(category.code)) continue;
		const knownLabel = categoryLabels.get(category.code);
		if (knownLabel && knownLabel !== category.libelle) {
			throw new Error(`Le libellé de la catégorie ${category.code} n'est pas cohérent.`);
		}
		categoryLabels.set(category.code, requireString(category.libelle, `Le libellé de ${category.code}`));
	}
}

for (const code of categoryCodes) {
	if (!categoryLabels.has(code)) {
		throw new Error(`La catégorie ${code} ne possède pas de libellé public.`);
	}
}

const noticesByReference = new Map();
const artistNoticeAssociations = new Set();
const noticeCategoryOccurrences = new Set();

for (const artist of [...artistes.artistes].sort((left, right) => compareText(left.slug, right.slug))) {
	const slug = requireString(artist.slug, 'Un slug artiste');
	const artistWorks = await json(resolve(target, 'oeuvres', `${slug}.json`));
	if (artistWorks.slug !== slug || !artistSlugs.has(artistWorks.slug)) {
		throw new Error(`Le fichier d'œuvres ${slug}.json ne correspond pas au répertoire des artistes.`);
	}
	if (!Array.isArray(artistWorks.oeuvres)) {
		throw new Error(`Le fichier d'œuvres ${slug}.json est invalide.`);
	}

	for (const work of artistWorks.oeuvres) {
		const reference = requireString(work.reference, `Une référence Joconde pour ${slug}`);
		const categoryCode = requireString(work.code, `Une catégorie pour ${reference}`);
		const museumCode = requireString(work.musee_code, `Un code musée pour ${reference}`);
		const excerpt = requireString(work.extrait, `Un extrait source pour ${slug} et ${reference}`);
		const title = work.titre == null ? null : work.titre;

		if (title !== null && typeof title !== 'string') {
			throw new Error(`Le titre de la notice ${reference} est invalide.`);
		}
		if (!artistSlugs.has(slug)) {
			throw new Error(`Le slug artiste ${slug} est inconnu.`);
		}
		if (!categoryLabels.has(categoryCode)) {
			throw new Error(`La catégorie ${categoryCode} de la notice ${reference} est inconnue.`);
		}
		if (!museumCodes.has(museumCode)) {
			throw new Error(`Le code Muséofile ${museumCode} de la notice ${reference} est inconnu.`);
		}

		const associationKey = `${slug}\u0000${reference}`;
		if (artistNoticeAssociations.has(associationKey)) {
			throw new Error(`L'association entre ${slug} et ${reference} n'est pas unique.`);
		}
		artistNoticeAssociations.add(associationKey);
		noticeCategoryOccurrences.add(`${reference}\u0000${categoryCode}`);

		let notice = noticesByReference.get(reference);
		if (!notice) {
			notice = {
				reference,
				titre: title,
				musee_code: museumCode,
				pop_url: `${popNoticeBaseUrl}${reference}`,
				relations: []
			};
			noticesByReference.set(reference, notice);
		} else {
			if (notice.musee_code !== museumCode) {
				throw new Error(`La notice ${reference} pointe vers plusieurs codes Muséofile.`);
			}
			if (notice.titre !== title) {
				throw new Error(`La notice ${reference} possède plusieurs titres incompatibles.`);
			}
		}

		notice.relations.push({ slug, code: categoryCode, extrait: excerpt });
	}
}

const notices = [...noticesByReference.values()].sort((left, right) =>
	compareText(left.reference, right.reference)
);
for (const notice of notices) {
	notice.relations.sort(
		(left, right) =>
			compareText(left.slug, right.slug) ||
			compareText(left.code, right.code) ||
			compareText(left.extrait, right.extrait)
	);
}

const producedCounts = {
	notices_distinctes: notices.length,
	associations_artiste_notice: artistNoticeAssociations.size,
	occurrences_notice_categorie: noticeCategoryOccurrences.size
};
const sourceCounts = {
	notices_distinctes: corpus.unites.notices_distinctes,
	associations_artiste_notice: corpus.unites.associations_artiste_notice,
	occurrences_notice_categorie: corpus.unites.occurrences_mentions
};

for (const [unit, count] of Object.entries(producedCounts)) {
	if (count !== sourceCounts[unit]) {
		throw new Error(`L'effectif produit pour ${unit} (${count}) diffère de la source (${sourceCounts[unit]}).`);
	}
}

const producedCategoryTotals = new Map(categoryCodes.map((code) => [code, 0]));
for (const occurrence of noticeCategoryOccurrences) {
	const categoryCode = occurrence.slice(occurrence.indexOf('\u0000') + 1);
	producedCategoryTotals.set(categoryCode, producedCategoryTotals.get(categoryCode) + 1);
}

const categories = categoryCodes.map((code) => {
	const sourceTotal = sourceCategoryTotals[code];
	const producedTotal = producedCategoryTotals.get(code);
	if (producedTotal !== sourceTotal) {
		throw new Error(
			`Le total produit pour ${code} (${producedTotal}) diffère de l'agrégat source (${sourceTotal}).`
		);
	}
	return {
		code,
		libelle: categoryLabels.get(code),
		unite: 'occurrences_notice_categorie',
		total: sourceTotal
	};
});

const exploration = {
	unites: {
		notices_distinctes: {
			cle: ['reference'],
			effectif: producedCounts.notices_distinctes
		},
		associations_artiste_notice: {
			cle: ['slug', 'reference'],
			effectif: producedCounts.associations_artiste_notice
		},
		occurrences_notice_categorie: {
			cle: ['reference', 'code'],
			effectif: producedCounts.occurrences_notice_categorie
		}
	},
	categories,
	notices
};

const artworkCopies = [];
const artworkPaths = new Set();
for (const [reference, metadata] of Object.entries(imagesIndex).sort(([left], [right]) =>
	compareText(left, right)
)) {
	requireString(reference, "Une référence dans l'index des reproductions");
	if (!noticesByReference.has(reference)) {
		throw new Error(`La reproduction ${reference} ne correspond à aucune notice de la projection.`);
	}
	const relativePath = requireRelativeMediaPath(
		metadata.url,
		'oeuvres',
		`Le chemin de la reproduction ${reference}`
	);
	if (artworkPaths.has(relativePath)) {
		throw new Error(`Le fichier de reproduction ${relativePath} est référencé plusieurs fois.`);
	}
	artworkPaths.add(relativePath);
	const sourcePath = resolve(sourceStatic, relativePath);
	await requireSourceFile(sourcePath, `La reproduction ${reference} (${relativePath})`);
	artworkCopies.push({ sourcePath, targetPath: resolve(staticRoot, relativePath) });
}

const portraits = {};
const portraitCopies = [];
const portraitPaths = new Set();
for (const [artistName, metadata] of Object.entries(sourcePortraits)) {
	const artist = artistsByName.get(artistName);
	if (!artist) {
		throw new Error(`Le portrait de ${artistName} ne correspond à aucun artiste du répertoire.`);
	}
	const slug = requireString(artist.slug, `Le slug de ${artistName}`);
	if (Object.hasOwn(portraits, slug)) {
		throw new Error(`Le slug ${slug} possède plusieurs portraits.`);
	}
	const relativePath = requireRelativeMediaPath(
		metadata.fichier,
		'portraits',
		`Le chemin du portrait de ${artistName}`,
		true
	);
	if (portraitPaths.has(relativePath)) {
		throw new Error(`Le fichier de portrait ${relativePath} est référencé plusieurs fois.`);
	}
	portraitPaths.add(relativePath);
	const sourcePath = resolve(sourceStatic, relativePath);
	await requireSourceFile(sourcePath, `Le portrait de ${artistName} (${relativePath})`);
	portraits[slug] = { ...metadata, fichier: relativePath };
	portraitCopies.push({ slug, sourcePath, targetPath: resolve(staticRoot, relativePath) });
}

const orderedPortraits = Object.fromEntries(
	Object.entries(portraits).sort(([left], [right]) => compareText(left, right))
);
portraitCopies.sort((left, right) => compareText(left.slug, right.slug));

await rm(artworkTarget, { recursive: true, force: true });
await rm(portraitTarget, { recursive: true, force: true });
await mkdir(artworkTarget, { recursive: true });
await mkdir(portraitTarget, { recursive: true });

for (const media of artworkCopies) {
	await cp(media.sourcePath, media.targetPath);
}
for (const media of portraitCopies) {
	await cp(media.sourcePath, media.targetPath);
}

const copiedArtworkFiles = await readdir(artworkTarget);
const copiedPortraitFiles = await readdir(portraitTarget);
if (copiedArtworkFiles.length !== artworkCopies.length) {
	throw new Error(`Le nombre de reproductions copiées (${copiedArtworkFiles.length}) est invalide.`);
}
if (copiedPortraitFiles.length !== portraitCopies.length) {
	throw new Error(`Le nombre de portraits copiés (${copiedPortraitFiles.length}) est invalide.`);
}

await writeFile(resolve(target, 'exploration.json'), `${JSON.stringify(exploration)}\n`);
await writeFile(resolve(target, 'portraits.json'), `${JSON.stringify(orderedPortraits, null, 2)}\n`);

let sourceCommit = null;
try {
	sourceCommit = execFileSync('git', ['-C', sourceRoot, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
} catch (error) {
	const reportedCommit = error?.stdout?.toString().trim();
	if (/^[0-9a-f]{40}$/.test(reportedCommit)) {
		sourceCommit = reportedCommit;
	}
}
if (!/^[0-9a-f]{40}$/.test(sourceCommit ?? '')) {
	throw new Error("Le commit du dépôt source est absent ou invalide ; la provenance du snapshot serait incomplète.");
}

const manifeste = {
	contractVersion: '0.1.0',
	generatedAt: new Date().toISOString(),
	sourceRepository,
	sourceCommit,
	sourceDataVersion: provenance.version_donnee,
	sourceDataUrl: provenance.url_source,
	counts: {
		artists: artistes.artistes.length,
		concernedRecords: corpus.unites.notices_distinctes,
		workFiles: artistes.artistes.length
	},
	exploration: {
		file: 'exploration.json',
		counts: {
			categories: categories.length,
			museums: new Set(notices.map(({ musee_code }) => musee_code)).size,
			distinctNotices: producedCounts.notices_distinctes,
			artistNoticeAssociations: producedCounts.associations_artiste_notice,
			noticeCategoryOccurrences: producedCounts.occurrences_notice_categorie
		}
	},
	media: {
		artworkReproductions: artworkCopies.length,
		portraits: portraitCopies.length,
		includesBinaryFiles: true
	}
};

await writeFile(resolve(target, 'manifest.webapp.json'), `${JSON.stringify(manifeste, null, 2)}\n`);
console.log(
	`Données synchronisées : ${manifeste.counts.artists} artistes, ${producedCounts.notices_distinctes} notices, ${artworkCopies.length} reproductions et ${portraitCopies.length} portraits.`
);
