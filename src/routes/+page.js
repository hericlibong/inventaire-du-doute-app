export async function load({ fetch }) {
	const [artistes, manifeste] = await Promise.all([
		fetch('./data/artistes.json').then((response) => response.json()),
		fetch('./data/manifest.webapp.json').then((response) => response.json())
	]);

	return { artistes: artistes.artistes, manifeste };
}

