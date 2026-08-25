const CATEGORIE = 'ecole_de';
const ARTISTE = 'charles-le-brun';
const NOTICE = '00000058405';

export async function chargerScenario(fetch) {
	const [exploration, artistesSource, musees, images] = await Promise.all([
		fetch('/data/exploration.json').then((response) => response.json()),
		fetch('/data/artistes.json').then((response) => response.json()),
		fetch('/data/musees.json').then((response) => response.json()),
		fetch('/data/images_index.json').then((response) => response.json())
	]);

	const artistesParSlug = new Map(artistesSource.artistes.map((artiste) => [artiste.slug, artiste]));
	const museesParCode = new Map(musees.map((musee) => [musee.code_museofile, musee]));
	const statistiques = new Map(
		exploration.categories.map((categorie) => [
			categorie.code,
			{ artistes: new Set(), musees: new Set(), lieux: new Map() }
		])
	);
	const comptesArtistes = new Map();

	for (const notice of exploration.notices) {
		for (const relation of notice.relations) {
			const stat = statistiques.get(relation.code);
			if (!stat) continue;
			stat.artistes.add(relation.slug);
			if (notice.musee_code) stat.musees.add(notice.musee_code);
			if (notice.musee_code) {
				stat.lieux.set(notice.musee_code, (stat.lieux.get(notice.musee_code) ?? 0) + 1);
			}
			if (relation.code === CATEGORIE) {
				comptesArtistes.set(relation.slug, (comptesArtistes.get(relation.slug) ?? 0) + 1);
			}
		}
	}

	const categories = exploration.categories.map((categorie) => {
		const stat = statistiques.get(categorie.code);
		return {
			...categorie,
			artistes: stat.artistes.size,
			musees: stat.musees.size,
			lieux: [...stat.lieux.entries()]
				.map(([code, total]) => ({
					code,
					total,
					musee: museesParCode.get(code)?.nom ?? 'Musée non renseigné',
					ville: museesParCode.get(code)?.ville ?? 'Lieu non renseigné',
					coord: museesParCode.get(code)?.coord ?? null
				}))
				.filter((lieu) => lieu.coord)
				.sort((a, b) => b.total - a.total)
		};
	});

	const artistes = [...comptesArtistes.entries()]
		.map(([slug, total]) => ({
			slug,
			nom: artistesParSlug.get(slug)?.nom ?? slug,
			total,
			musees: artistesParSlug.get(slug)?.nb_musees_doute ?? 0
		}))
		.sort((a, b) => b.total - a.total || a.nom.localeCompare(b.nom, 'fr'));

	const notice = exploration.notices.find((entree) => entree.reference === NOTICE);
	const relation = notice.relations.find(
		(entree) => entree.slug === ARTISTE && entree.code === CATEGORIE
	);
	const artiste = artistes.find((entree) => entree.slug === ARTISTE);
	const musee = museesParCode.get(notice.musee_code);
	const image = images[NOTICE];

	if (!notice || !relation || !artiste || !musee || !image) {
		throw new Error('Le scénario commun du laboratoire est incomplet.');
	}

	return {
		categories,
		categorie: categories.find((entree) => entree.code === CATEGORIE),
		artistes,
		artiste,
		notice: {
			...notice,
			extrait: relation.extrait,
			image: `/${image.url}`,
			credit: image.credit,
			licence: image.licence
		},
		musee: {
			code: musee.code_museofile,
			nom: musee.nom,
			ville: musee.ville,
			departement: musee.departement,
			region: musee.region,
			coord: musee.coord
		},
		unites: exploration.unites
	};
}
