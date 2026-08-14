import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';

const appRoot = resolve(import.meta.dirname, '..');
const sourceRoot = resolve(process.env.INVENTAIRE_SOURCE ?? resolve(appRoot, '..', 'MuseumAtribution'));
const source = resolve(sourceRoot, 'data', 'exports', 'web');
const target = resolve(appRoot, 'static', 'data');

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

await rm(target, { recursive: true, force: true });
await mkdir(target, { recursive: true });

for (const file of rootFiles) {
	await cp(resolve(source, file), resolve(target, file));
}
await cp(resolve(source, 'oeuvres'), resolve(target, 'oeuvres'), { recursive: true });

const artistes = await json(resolve(target, 'artistes.json'));
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

let sourceCommit = null;
try {
	sourceCommit = execFileSync('git', ['-C', sourceRoot, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
} catch {
	// Le snapshot reste utilisable hors d'un clone Git, grâce à version_donnee.
}

const manifeste = {
	contractVersion: '0.1.0',
	generatedAt: new Date().toISOString(),
	sourceRepository: 'hericlibong/inventaire-du-doute',
	sourceCommit,
	sourceDataVersion: provenance.version_donnee,
	sourceDataUrl: provenance.url_source,
	counts: {
		artists: artistes.artistes.length,
		concernedRecords: corpus.unites.notices_distinctes,
		workFiles: artistes.artistes.length
	},
	includesArtworkImages: false
};

await writeFile(resolve(target, 'manifest.webapp.json'), `${JSON.stringify(manifeste, null, 2)}\n`);
console.log(`Données synchronisées : ${manifeste.counts.artists} artistes, contrat ${manifeste.contractVersion}.`);

