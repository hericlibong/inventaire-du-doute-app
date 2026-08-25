import { chargerScenario } from '$lib/laboratoire/data.js';

export async function load({ fetch }) {
	return chargerScenario(fetch);
}

export const prerender = true;
