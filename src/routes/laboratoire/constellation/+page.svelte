<script>
	import { onMount } from 'svelte';

	let { data } = $props();
	let etape = $state('ensemble');

	onMount(() => {
		if (new URLSearchParams(window.location.search).get('etat') === 'selection') etape = 'artiste';
	});

	const positions = [
		['13%', '18%'],
		['43%', '4%'],
		['72%', '18%'],
		['78%', '52%'],
		['68%', '78%'],
		['39%', '82%'],
		['8%', '68%'],
		['3%', '39%']
	];
	let maxCategorie = $derived(Math.max(...data.categories.map((categorie) => categorie.total)));
	let maxArtiste = $derived(Math.max(...data.artistes.map((artiste) => artiste.total)));

	function choisirCategorie() {
		etape = 'categorie';
	}

	function choisirArtiste() {
		etape = 'artiste';
	}

	function retour() {
		etape = etape === 'artiste' ? 'categorie' : 'ensemble';
	}
</script>

<svelte:head>
	<title>Constellation relationnelle — Laboratoire</title>
	<meta name="description" content="Prototype relationnel des formulations du doute." />
</svelte:head>

<main class="constellation" class:selection={etape !== 'ensemble'} class:detail={etape === 'artiste'}>
	<header>
		<div class="marque">
			<span>Laboratoire 01</span>
			<strong>L’inventaire du doute</strong>
		</div>
		<div class="titre">
			<p>Constellation relationnelle</p>
			<span>Des mots vers les œuvres</span>
		</div>
		<p class="mode">{etape === 'ensemble' ? 'Vue générale' : etape === 'categorie' ? 'Une formulation' : 'Une relation'}</p>
	</header>

	{#if etape === 'ensemble'}
		<section class="ciel" aria-label="Les huit catégories de formulations">
			<svg class="orbites" viewBox="0 0 1000 650" aria-hidden="true">
				<ellipse cx="500" cy="325" rx="230" ry="150" />
				<ellipse cx="500" cy="325" rx="410" ry="260" />
				<path d="M90,375 C260,140 720,110 910,360 C700,535 285,590 90,375Z" />
			</svg>
			<div class="centre">
				<span>8 formulations</span>
				<strong>{data.unites.occurrences_notice_categorie.effectif.toLocaleString('fr-FR')}</strong>
				<small>occurrences dans les notices</small>
			</div>

			{#each data.categories as categorie, index (categorie.code)}
				<button
					type="button"
					class="pole"
					class:cible={categorie.code === 'ecole_de'}
					style={`--x:${positions[index][0]};--y:${positions[index][1]};--poids:${0.42 + (categorie.total / maxCategorie) * 0.75}`}
					onclick={categorie.code === 'ecole_de' ? choisirCategorie : undefined}
					aria-label={`${categorie.libelle}, ${categorie.total} occurrences`}
				>
					<i aria-hidden="true"></i>
					<span>{categorie.libelle}</span>
					<strong>{categorie.total.toLocaleString('fr-FR')}</strong>
					{#if categorie.code === 'ecole_de'}<em>explorer</em>{/if}
				</button>
			{/each}
			<p class="legende">Chaque pôle garde sa place&nbsp;: même les 18 mentions «&nbsp;suiveur de&nbsp;» restent visibles.</p>
		</section>
	{:else}
		<section class="relation" aria-live="polite">
			<div class="contexte">
				<button class="retour" type="button" onclick={retour}>← Revenir</button>
				<div class="miniatures" aria-label="Contexte des huit formulations">
					{#each data.categories as categorie (categorie.code)}
						<span class:actif={categorie.code === 'ecole_de'}>
							<i></i>{categorie.libelle}<strong>{categorie.total.toLocaleString('fr-FR')}</strong>
						</span>
					{/each}
				</div>
			</div>

			<div class="fil">
				<svg viewBox="0 0 1100 590" preserveAspectRatio="none" aria-hidden="true">
					<path class="principal" d="M120 290 C300 290, 310 100, 525 95 S720 125, 820 105" />
					<path d="M120 290 C320 290, 350 200, 525 205" />
					<path d="M120 290 C330 290, 350 302, 525 302" />
					<path d="M120 290 C320 290, 350 405, 525 405" />
					<path d="M120 290 C300 290, 320 510, 525 510" />
					{#if etape === 'artiste'}
						<path class="principal suite" d="M525 95 C720 95, 735 305, 875 305" />
					{/if}
				</svg>

				<div class="ancrage">
					<span>formulation choisie</span>
					<h1>école de</h1>
					<strong>{data.categorie.total.toLocaleString('fr-FR')}</strong>
					<small>occurrences · {data.categorie.artistes} artistes · {data.categorie.musees} musées</small>
				</div>

				<div class="artistes" aria-label="Artistes associés à école de">
					<p>{data.artistes.length} noms reliés</p>
					{#each data.artistes.slice(0, 5) as artiste, index (artiste.slug)}
						<button
							type="button"
							class:charles={artiste.slug === 'charles-le-brun'}
							class:choisi={etape === 'artiste' && artiste.slug === 'charles-le-brun'}
							style={`--taille:${0.65 + (artiste.total / maxArtiste) * 0.55}`}
							onclick={artiste.slug === 'charles-le-brun' ? choisirArtiste : undefined}
						>
							<i></i><span>{artiste.nom}</span><strong>{artiste.total}</strong>
							<small>{artiste.total} notices</small>
						</button>
					{/each}
				</div>

				{#if etape === 'categorie'}
					<div class="invitation">
						<span>Le lien le plus dense</span>
						<strong>Charles Le Brun</strong>
						<p>240 notices conduisent vers ses œuvres et leurs lieux.</p>
					</div>
			{:else}
					<article class="oeuvre">
						<figure>
							<img src={data.notice.image} alt="Sainte Geneviève devant Paris" />
							<figcaption>{data.notice.licence}</figcaption>
						</figure>
						<div>
							<span>Notice {data.notice.reference}</span>
							<h2>{data.notice.titre}</h2>
							<blockquote>«&nbsp;{data.notice.extrait}&nbsp;»</blockquote>
							<p class="lieu"><i></i><strong>{data.musee.nom}</strong><br />{data.musee.ville} · {data.musee.region}</p>
						</div>
					</article>
				{/if}
			</div>
		</section>
	{/if}
</main>

<style>
	:global(body) { background: #181521; }
	:global(button) { font: inherit; }
	.constellation {
		--ivoire: #f1eadc;
		--encre: #181521;
		--bleu: #8aa9ff;
		--or: #ddb869;
		min-height: 100svh;
		width: 100%;
		max-width: 100vw;
		color: var(--ivoire);
		background:
			radial-gradient(circle at 51% 45%, rgba(93, 75, 126, .22), transparent 31rem),
			linear-gradient(135deg, #211c2c, #11121b 70%);
		overflow: hidden;
	}
	header { height: 5.4rem; padding: 1.15rem 2rem; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; border-bottom: 1px solid rgba(241,234,220,.16); }
	.marque span, .titre p, .mode { margin: 0; text-transform: uppercase; letter-spacing: .16em; font-size: .64rem; }
	.marque strong { display: block; margin-top: .35rem; font: 400 1rem Georgia, serif; }
	.titre { text-align: center; }
	.titre span { display: block; margin-top: .28rem; color: #9792a3; font: italic .8rem Georgia, serif; }
	.mode { justify-self: end; color: var(--or); }
	.ciel { position: relative; height: calc(100svh - 5.4rem); min-height: 42rem; max-width: 88rem; margin: auto; }
	.orbites { position: absolute; inset: 5% 8%; width: 84%; height: 82%; fill: none; stroke: rgba(241,234,220,.12); stroke-width: 1; }
	.orbites path { stroke-dasharray: 2 7; }
	.centre { position: absolute; left: 50%; top: 48%; transform: translate(-50%,-50%); width: 15rem; text-align: center; }
	.centre::before { content: ''; position: absolute; inset: -3.6rem -1.6rem; border: 1px solid rgba(138,169,255,.32); border-radius: 50%; box-shadow: 0 0 70px rgba(138,169,255,.08); }
	.centre span { display: block; color: var(--bleu); text-transform: uppercase; letter-spacing: .18em; font-size: .67rem; }
	.centre strong { display: block; margin: .15rem 0; font: 400 4.6rem/.9 Georgia,serif; }
	.centre small { color: #a8a2af; font-size: .72rem; }
	.pole { position: absolute; left: var(--x); top: var(--y); display: grid; grid-template-columns: auto 1fr; gap: .1rem .65rem; min-width: 10rem; padding: .65rem; color: inherit; border: 0; background: transparent; text-align: left; cursor: default; }
	.pole i { grid-row: 1 / 4; align-self: center; width: calc(1.2rem * var(--poids)); aspect-ratio: 1; border: 1px solid var(--bleu); border-radius: 50%; background: rgba(138,169,255,.14); box-shadow: 0 0 0 .45rem rgba(138,169,255,.04); }
	.pole span { font: 400 clamp(.86rem,1.25vw,1.22rem) Georgia,serif; }
	.pole strong { color: #a8a2af; font-size: .72rem; font-weight: 500; }
	.pole em { color: var(--or); text-transform: uppercase; letter-spacing: .14em; font: normal .56rem system-ui,sans-serif; }
	.pole.cible { cursor: pointer; }
	.pole.cible i { background: var(--or); border-color: var(--or); box-shadow: 0 0 0 .5rem rgba(221,184,105,.12), 0 0 28px rgba(221,184,105,.3); }
	.pole.cible:hover span, .pole.cible:focus-visible span { color: var(--or); }
	.legende { position: absolute; bottom: 1.4rem; left: 50%; transform: translateX(-50%); margin: 0; color: #85818c; font-size: .67rem; white-space: nowrap; }
	.relation { height: calc(100svh - 5.4rem); min-height: 43rem; }
	.contexte { height: 6.4rem; padding: .75rem 2rem; display: grid; grid-template-columns: 7rem 1fr; gap: 1.5rem; align-items: center; border-bottom: 1px solid rgba(241,234,220,.12); }
	.retour { padding: .55rem 0; color: #b1aab7; border: 0; background: none; text-align: left; cursor: pointer; }
	.miniatures { display: grid; grid-template-columns: repeat(8, minmax(0,1fr)); gap: 1rem; }
	.miniatures span { min-width: 0; color: #777380; font: .68rem/1.15 Georgia,serif; }
	.miniatures i { display: block; width: .45rem; height: .45rem; margin-bottom: .35rem; border-radius: 50%; background: #55515e; }
	.miniatures strong { display: block; margin-top: .2rem; color: #777380; font: 500 .6rem system-ui,sans-serif; }
	.miniatures span.actif { color: var(--ivoire); }
	.miniatures span.actif i { background: var(--or); box-shadow: 0 0 0 .25rem rgba(221,184,105,.12); }
	.miniatures span.actif strong { color: var(--or); }
	.fil { position: relative; height: calc(100% - 6.4rem); max-width: 88rem; margin: auto; }
	.fil > svg { position: absolute; inset: 0; width: 100%; height: 100%; fill: none; stroke: rgba(138,169,255,.22); stroke-width: 1; }
	.fil > svg .principal { stroke: rgba(221,184,105,.8); stroke-width: 1.5; }
	.fil > svg .suite { stroke-dasharray: 3 4; }
	.ancrage { position: absolute; left: 4%; top: 32%; width: 16rem; }
	.ancrage span, .artistes > p, .invitation span, .oeuvre > div > span { text-transform: uppercase; letter-spacing: .15em; color: #8f8997; font-size: .58rem; }
	.ancrage h1 { margin: .35rem 0 .7rem; color: var(--or); font: 400 3.4rem/.9 Georgia,serif; }
	.ancrage > strong { display: block; font: 400 1.6rem Georgia,serif; }
	.ancrage small { display: block; max-width: 12rem; margin-top: .3rem; color: #8f8997; line-height: 1.4; }
	.artistes { position: absolute; left: 40%; top: 3%; width: 21rem; height: 92%; }
	.artistes > p { margin: 0 0 .55rem; }
	.artistes button { position: relative; display: grid; grid-template-columns: auto 1fr auto; gap: .05rem .65rem; align-items: center; width: 100%; height: 19%; padding: .35rem 0; color: #aaa4b0; border: 0; background: transparent; text-align: left; cursor: default; }
	.artistes button i { grid-row: 1/3; width: calc(1rem * var(--taille)); aspect-ratio: 1; border: 1px solid currentColor; border-radius: 50%; }
	.artistes button span { font: 400 calc(.82rem * var(--taille)) Georgia,serif; }
	.artistes button strong { font-size: .65rem; }
	.artistes button small { grid-column: 2/4; color: #66616d; font-size: .58rem; }
	.artistes button.charles { color: var(--ivoire); cursor: pointer; }
	.artistes button.charles i { border-color: var(--or); background: rgba(221,184,105,.22); }
	.artistes button.charles::after { content: 'ouvrir'; position: absolute; right: 0; bottom: .55rem; color: var(--or); text-transform: uppercase; letter-spacing: .12em; font-size: .5rem; }
	.artistes button.choisi span { color: var(--or); }
	.invitation { position: absolute; left: 73%; top: 35%; width: 13rem; }
	.invitation strong { display: block; margin: .35rem 0; font: 400 1.35rem Georgia,serif; }
	.invitation p { color: #827d88; font-size: .72rem; line-height: 1.5; }
	.oeuvre { position: absolute; left: 65%; top: 10%; width: 32%; height: 80%; display: grid; grid-template-columns: minmax(8rem, 43%) 1fr; gap: 1.25rem; align-items: center; }
	.oeuvre figure { margin: 0; }
	.oeuvre img { display: block; width: 100%; max-height: 24rem; object-fit: cover; filter: saturate(.72) contrast(1.04); box-shadow: 1rem 1rem 0 rgba(138,169,255,.08); }
	.oeuvre figcaption { margin-top: .4rem; color: #77717d; font-size: .5rem; }
	.oeuvre h2 { margin: .55rem 0 .9rem; font: 400 clamp(1.3rem,2vw,2.1rem)/1 Georgia,serif; }
	.oeuvre blockquote { margin: 0; color: var(--or); font: italic .88rem/1.45 Georgia,serif; }
	.lieu { margin-top: 1.4rem; padding-top: .8rem; border-top: 1px solid rgba(241,234,220,.18); color: #aaa4b0; font-size: .68rem; line-height: 1.5; }
	.lieu i { display: inline-block; width: .55rem; height: .55rem; margin-right: .4rem; border: 1px solid var(--bleu); border-radius: 50%; }
	.lieu strong { color: var(--ivoire); font-weight: 500; }

	@media (max-width: 700px) {
		header { width: 100%; min-width: 0; height: 4.4rem; padding: .75rem 1rem; grid-template-columns: minmax(0,1fr) auto; overflow: hidden; }
		.marque, .titre { min-width: 0; }
		.marque span { display: none; }
		.marque strong { margin: 0; font-size: .86rem; }
		.titre { text-align: right; }
		.titre p { font-size: .52rem; }
		.titre span, .mode { display: none; }
		.ciel { height: calc(100svh - 4.4rem); min-height: 0; padding: 1rem; display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 6rem repeat(4, 1fr) 2rem; gap: .3rem .8rem; }
		.orbites { inset: 8% 3%; width: 94%; height: 82%; }
		.centre { position: relative; left: auto; top: auto; transform: none; grid-column: 1/3; align-self: center; width: auto; }
		.centre::before { inset: -.7rem 4rem; }
		.centre strong { display: inline; margin-right: .3rem; font-size: 2.35rem; }
		.centre small { display: inline; }
		.pole { position: relative; left: auto; top: auto; min-width: 0; padding: .3rem; align-self: center; }
		.pole i { width: calc(.8rem * var(--poids)); }
		.pole span { font-size: .78rem; line-height: 1.05; }
		.pole strong { font-size: .61rem; }
		.pole em { display: none; }
		.legende { position: relative; bottom: auto; left: auto; transform: none; grid-column: 1/3; align-self: end; text-align: center; font-size: .55rem; white-space: normal; }
		.relation { height: calc(100svh - 4.4rem); min-height: 0; }
		.contexte { height: 6.5rem; padding: .4rem 1rem; display: block; overflow: hidden; }
		.retour { padding: 0; height: 1.6rem; font-size: .7rem; }
		.miniatures { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: .35rem .5rem; }
		.miniatures span { min-width: 0; font-size: .46rem; }
		.miniatures strong { margin-top: .08rem; font-size: .48rem; }
		.miniatures i { margin-bottom: .2rem; }
		.fil { height: calc(100% - 6.5rem); }
		.fil > svg { display: none; }
		.ancrage { left: 1rem; top: .85rem; width: calc(100% - 2rem); display: grid; grid-template-columns: 1fr auto; align-items: end; }
		.ancrage span { grid-column: 1/3; }
		.ancrage h1 { margin: .2rem 0; font-size: 2rem; }
		.ancrage > strong { font-size: 1.25rem; }
		.ancrage small { grid-column: 1/3; max-width: none; font-size: .56rem; }
		.artistes { left: 1rem; top: 6.4rem; width: calc(100% - 2rem); height: 14rem; display: grid; grid-template-columns: 1fr 1fr; gap: 0 .8rem; }
		.artistes > p { grid-column: 1/3; }
		.artistes button { height: 3.5rem; }
		.artistes button:nth-of-type(n+5) { display: none; }
		.artistes button span { font-size: calc(.68rem * var(--taille)); }
		.artistes button.charles::after { display: none; }
		.invitation { left: 1rem; top: 22rem; width: calc(100% - 2rem); padding-top: .75rem; border-top: 1px solid rgba(241,234,220,.16); }
		.invitation p { margin-top: .25rem; }
		.detail .artistes { height: 7.2rem; }
		.detail .artistes button { display: none; }
		.detail .artistes button:first-of-type { display: grid; grid-column: 1/3; }
		.oeuvre { left: 1rem; top: 14.2rem; width: calc(100% - 2rem); height: calc(100% - 14.7rem); grid-template-columns: 7.6rem 1fr; gap: 1rem; align-items: start; }
		.oeuvre img { max-height: 12rem; }
		.oeuvre h2 { margin: .35rem 0 .55rem; font-size: 1.25rem; }
		.oeuvre blockquote { font-size: .72rem; }
		.lieu { margin-top: .7rem; font-size: .61rem; }
	}
</style>
