<script>
	import { onMount } from 'svelte';

	let { data } = $props();
	let etape = $state('ensemble');

	onMount(() => {
		if (new URLSearchParams(window.location.search).get('etat') === 'selection') etape = 'artiste';
	});
	const couleurs = ['#86674b', '#b14535', '#315f69', '#8c6a8e', '#64734f', '#c08f31', '#4d668a', '#8c4f59'];
	let maxCategorie = $derived(Math.max(...data.categories.map((categorie) => categorie.total)));

	function x(coord) { return 665 + ((coord[1] + 5.5) / 14.5) * 445; }
	function y(coord) { return 75 + ((51.5 - coord[0]) / 10) * 500; }
	function chemin(index, coord) {
		const departY = 92 + index * 61;
		const arriveeX = x(coord);
		const arriveeY = y(coord);
		return `M 285 ${departY} C 470 ${departY}, 500 ${arriveeY}, ${arriveeX} ${arriveeY}`;
	}
	function choisirCategorie() { etape = 'categorie'; }
	function choisirArtiste() { etape = 'artiste'; }
	function retour() { etape = etape === 'artiste' ? 'categorie' : 'ensemble'; }
</script>

<svelte:head>
	<title>Atlas hybride — Laboratoire</title>
	<meta name="description" content="Prototype d’atlas relationnel des formulations du doute." />
</svelte:head>

<main class="atlas" class:selection={etape !== 'ensemble'} class:detail={etape === 'artiste'}>
	<header>
		<p><span>Laboratoire 03</span><strong>L’inventaire du doute</strong></p>
		<div><h1>Atlas hybride</h1><span>les mots traversent les collections</span></div>
		<em>Corpus Joconde · 6 081 notices</em>
	</header>

	{#if etape === 'ensemble'}
		<section class="territoire">
			<div class="appel">
				<span>Entrer par une formulation</span>
				<h2>Huit courants<br />de doute</h2>
			</div>

			<svg class="carte-generale" viewBox="0 0 1200 650" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
				<defs>
					<pattern id="trame-atlas" width="22" height="22" patternUnits="userSpaceOnUse">
						<path d="M22 0H0V22" fill="none" stroke="#234b55" stroke-opacity=".09" stroke-width="1" />
					</pattern>
				</defs>
				<rect x="560" y="28" width="610" height="580" fill="url(#trame-atlas)" />
				<path class="france" d="M805 62 L902 82 L943 133 L1004 152 L1031 218 L1088 247 L1052 300 L1067 358 L1012 389 L978 467 L913 489 L879 563 L824 535 L790 478 L725 458 L704 399 L660 366 L686 302 L654 246 L701 204 L713 139 L770 122 Z" />
				<path class="relief" d="M735 165 C785 230 828 274 923 300 S1010 407 939 472" />
				<path class="relief" d="M690 351 C775 339 860 390 902 525" />
				{#each data.categories as categorie, index (categorie.code)}
					{@const lieu = categorie.lieux[0]}
					{#if lieu}
						<path class="courant" d={chemin(index, lieu.coord)} style={`--couleur:${couleurs[index]};--epaisseur:${1.3 + (categorie.total / maxCategorie) * 7}`} />
						<circle class="arrivee" cx={x(lieu.coord)} cy={y(lieu.coord)} r={4 + (categorie.total / maxCategorie) * 5} style={`--couleur:${couleurs[index]}`} />
					{/if}
				{/each}
				<text x="1080" y="54">N</text>
				<path class="nord" d="M1085 64v26m0-26-5 10m5-10 5 10" />
				<text class="mer" x="535" y="565">océan Atlantique</text>
				<text class="mer" x="1018" y="600">Méditerranée</text>
			</svg>

			<div class="courants" aria-label="Huit formulations reliées aux lieux">
				{#each data.categories as categorie, index (categorie.code)}
					<button
						type="button"
						class:cible={categorie.code === 'ecole_de'}
						style={`--couleur:${couleurs[index]}`}
						onclick={categorie.code === 'ecole_de' ? choisirCategorie : undefined}
					>
						<i>{String(index + 1).padStart(2, '0')}</i>
						<span>{categorie.libelle}</span>
						<strong>{categorie.total.toLocaleString('fr-FR')}</strong>
						<small>{categorie.musees} lieux</small>
					</button>
				{/each}
			</div>
			<p class="note">Les courants indiquent une présence dans les collections, jamais un classement des musées. Chaque formulation garde un tracé lisible, de 18 à 3 384 occurrences.</p>
		</section>
	{:else}
		<section class="atlas-ouvert">
			<nav>
				<button class="retour" type="button" onclick={retour}>← Revenir</button>
				<div>
					{#each data.categories as categorie, index (categorie.code)}
						<span class:actif={categorie.code === 'ecole_de'} style={`--couleur:${couleurs[index]}`}><i></i>{categorie.libelle}<b>{categorie.total.toLocaleString('fr-FR')}</b></span>
					{/each}
				</div>
			</nav>

			<div class="feuille">
				<div class="titre-selection">
					<span>Courant 03 · formulation choisie</span>
					<h2>école de</h2>
					<p>{data.categorie.total.toLocaleString('fr-FR')} occurrences · {data.categorie.artistes} artistes · {data.categorie.musees} musées</p>
				</div>

				<svg class="geographie" viewBox="0 0 900 590" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
					<path class="france" d="M505 38 L596 60 L632 106 L695 120 L721 187 L771 218 L745 270 L756 329 L704 358 L674 439 L616 458 L582 531 L527 503 L497 449 L437 429 L416 372 L375 342 L400 281 L369 228 L414 189 L423 123 L476 106 Z" />
					{#each data.categorie.lieux.slice(0, 12) as lieu, index (lieu.code)}
						{@const px = x(lieu.coord) - 290}
						{@const py = y(lieu.coord) - 25}
						<path class="liaison-lieu" d={`M ${188 + (index % 3) * 18} ${185 + Math.floor(index / 3) * 46} C 340 ${185 + Math.floor(index / 3) * 46}, 350 ${py}, ${px} ${py}`} />
						<circle class="point-lieu" cx={px} cy={py} r={Math.max(3.5, Math.min(10, 2 + Math.sqrt(lieu.total)))} />
					{/each}
					<circle class="rouen" cx={x(data.musee.coord) - 290} cy={y(data.musee.coord) - 25} r="10" />
					<text class="rouen-label" x={x(data.musee.coord) - 275} y={y(data.musee.coord) - 32}>Rouen</text>
				</svg>

				<div class="archipel" aria-label="Artistes associés à école de">
					<span>{data.artistes.length} artistes</span>
					{#each data.artistes.slice(0, 6) as artiste, index (artiste.slug)}
						<button
							type="button"
							class:charles={artiste.slug === 'charles-le-brun'}
							class:choisi={etape === 'artiste' && artiste.slug === 'charles-le-brun'}
							style={`--rang:${index}`}
							onclick={artiste.slug === 'charles-le-brun' ? choisirArtiste : undefined}
						>
							<i></i><strong>{artiste.nom}</strong><small>{artiste.total} notices</small>
						</button>
					{/each}
				</div>

				{#if etape === 'categorie'}
					<div class="mode-emploi"><span>Choisir un nom</span><p>Les artistes forment le passage entre les mots, les notices et les lieux.</p></div>
				{:else}
					<article class="escale">
						<figure><img src={data.notice.image} alt="Sainte Geneviève devant Paris" /><figcaption>{data.notice.licence}</figcaption></figure>
						<div>
							<span>Notice reliée · {data.notice.reference}</span>
							<h3>{data.notice.titre}</h3>
							<blockquote>«&nbsp;{data.notice.extrait}&nbsp;»</blockquote>
							<p><strong>{data.musee.nom}</strong><br />{data.musee.ville} · {data.musee.region}</p>
						</div>
					</article>
				{/if}
			</div>
		</section>
	{/if}
</main>

<style>
	:global(body) { background: #d9e0dc; }
	:global(button) { font: inherit; }
	.atlas {
		--mer: #d9e0dc;
		--papier: #f0eadc;
		--encre: #18343a;
		--rouge: #b14535;
		min-height: 100svh;
		color: var(--encre);
		background: var(--mer);
		overflow: hidden;
	}
	header { height: 5.2rem; padding: 1rem 2rem; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; border-bottom: 1px solid rgba(24,52,58,.4); }
	header p, header h1, header em { margin: 0; }
	header p span { display: block; text-transform: uppercase; letter-spacing: .17em; font-size: .55rem; }
	header p strong { display: block; margin-top: .25rem; font: 400 1rem Georgia,serif; }
	header div { text-align: center; }
	header h1 { text-transform: uppercase; letter-spacing: .18em; font: 700 .82rem system-ui,sans-serif; }
	header div span { font: italic .75rem Georgia,serif; }
	header em { justify-self: end; font: normal .58rem monospace; }
	.territoire { position: relative; height: calc(100svh - 5.2rem); min-height: 44rem; max-width: 90rem; margin: auto; }
	.appel { position: absolute; z-index: 3; left: 2rem; top: 1.8rem; }
	.appel span, .titre-selection > span, .mode-emploi span, .escale > div > span { color: var(--rouge); text-transform: uppercase; letter-spacing: .16em; font-size: .57rem; }
	.appel h2 { margin: .45rem 0; font: 400 clamp(2rem,3vw,3.2rem)/.93 Georgia,serif; }
	.carte-generale { position: absolute; inset: 0; width: 100%; height: 100%; }
	.france { fill: rgba(240,234,220,.74); stroke: var(--encre); stroke-width: 1.25; }
	.relief { fill: none; stroke: rgba(24,52,58,.19); stroke-width: 1; stroke-dasharray: 3 5; }
	.courant { fill: none; stroke: var(--couleur); stroke-width: var(--epaisseur); opacity: .58; }
	.arrivee { fill: var(--couleur); stroke: var(--papier); stroke-width: 2; }
	.carte-generale text { fill: var(--encre); font: 10px monospace; }
	.carte-generale .mer { fill: #71878a; font: italic 11px Georgia,serif; }
	.nord { fill: none; stroke: var(--encre); stroke-width: 1; }
	.courants { position: absolute; z-index: 4; left: 2rem; top: 10.5rem; width: 17rem; }
	.courants button { width: 100%; height: 3.8rem; display: grid; grid-template-columns: 1.6rem 1fr auto; gap: .1rem .4rem; align-items: center; padding: .3rem 0; color: inherit; border: 0; border-bottom: 1px solid rgba(24,52,58,.35); background: transparent; text-align: left; cursor: default; }
	.courants button > i { grid-row: 1/3; color: var(--couleur); font: normal .5rem monospace; }
	.courants button span { font: 400 .88rem Georgia,serif; }
	.courants button strong { color: var(--couleur); font: 700 .64rem monospace; }
	.courants button small { grid-column: 2/4; color: #688084; font-size: .52rem; }
	.courants button.cible { cursor: pointer; }
	.courants button.cible span { color: var(--rouge); font-weight: 700; }
	.courants button.cible:hover, .courants button.cible:focus-visible { padding-left: .5rem; outline: 1px solid var(--rouge); }
	.note { position: absolute; right: 2rem; bottom: 1.4rem; width: 22rem; margin: 0; color: #607579; font-size: .61rem; line-height: 1.5; }
	.atlas-ouvert { height: calc(100svh - 5.2rem); min-height: 44rem; max-width: 90rem; margin: auto; display: grid; grid-template-columns: 11rem 1fr; }
	.atlas-ouvert nav { padding: 1rem 1rem 1rem 2rem; border-right: 1px solid rgba(24,52,58,.4); }
	.retour { margin-bottom: 1.5rem; padding: .3rem 0; border: 0; border-bottom: 1px solid var(--encre); color: inherit; background: none; cursor: pointer; }
	.atlas-ouvert nav div { display: grid; gap: .55rem; }
	.atlas-ouvert nav span { display: grid; grid-template-columns: .8rem 1fr; gap: .15rem .3rem; color: #728487; font: .62rem/1.15 Georgia,serif; }
	.atlas-ouvert nav span i { grid-row: 1/3; align-self: center; width: .32rem; height: 1.5rem; background: var(--couleur); opacity: .55; }
	.atlas-ouvert nav span b { font: 500 .52rem monospace; }
	.atlas-ouvert nav span.actif { margin: .2rem -.5rem; padding: .55rem .5rem; color: var(--papier); background: var(--rouge); }
	.atlas-ouvert nav span.actif i { background: var(--papier); opacity: 1; }
	.feuille { position: relative; overflow: hidden; background: linear-gradient(90deg, rgba(240,234,220,.85), rgba(240,234,220,.28) 52%, transparent); }
	.titre-selection { position: absolute; z-index: 3; left: 2rem; top: 1.7rem; }
	.titre-selection h2 { margin: .25rem 0; font: 400 clamp(2.8rem,5vw,4.8rem)/.9 Georgia,serif; }
	.titre-selection p { margin: .7rem 0 0; font: .6rem monospace; }
	.geographie { position: absolute; inset: 0 0 0 12%; width: 88%; height: 100%; }
	.liaison-lieu { fill: none; stroke: rgba(49,95,105,.28); stroke-width: 1; }
	.point-lieu { fill: #315f69; fill-opacity: .6; stroke: var(--papier); stroke-width: 1.2; }
	.rouen { fill: var(--rouge); stroke: var(--papier); stroke-width: 3; }
	.rouen-label { fill: var(--rouge); font: 12px Georgia,serif; }
	.archipel { position: absolute; z-index: 4; left: 2rem; top: 9.2rem; width: 18rem; }
	.archipel > span { display: block; margin-bottom: .4rem; color: #718487; text-transform: uppercase; letter-spacing: .15em; font-size: .52rem; }
	.archipel button { position: relative; width: 100%; min-height: 2.85rem; display: grid; grid-template-columns: 1rem 1fr auto; align-items: center; gap: .15rem .5rem; padding: .3rem 0; color: inherit; border: 0; background: transparent; text-align: left; cursor: default; }
	.archipel button i { grid-row: 1/3; width: .5rem; height: .5rem; border: 1px solid var(--encre); border-radius: 50%; }
	.archipel button strong { font: 400 .85rem Georgia,serif; }
	.archipel button small { grid-column: 2/4; color: #748689; font-size: .52rem; }
	.archipel button::after { content: ''; position: absolute; left: .45rem; top: 2rem; width: 1px; height: 1.8rem; background: rgba(24,52,58,.25); }
	.archipel button.charles { cursor: pointer; }
	.archipel button.charles i { background: var(--rouge); border-color: var(--rouge); box-shadow: 0 0 0 .28rem rgba(177,69,53,.13); }
	.archipel button.charles strong { color: var(--rouge); font-weight: 700; }
	.archipel button.choisi::before { content: 'sélection'; position: absolute; right: 0; top: 0; color: var(--rouge); text-transform: uppercase; font-size: .42rem; }
	.mode-emploi { position: absolute; z-index: 3; left: 23rem; bottom: 2rem; width: 13rem; padding-top: .6rem; border-top: 1px solid var(--encre); }
	.mode-emploi p { margin: .35rem 0; font: italic .78rem/1.4 Georgia,serif; }
	.escale { position: absolute; z-index: 5; right: 2rem; bottom: 2rem; width: 35rem; height: 19rem; display: grid; grid-template-columns: 12rem 1fr; gap: 1.2rem; padding: .9rem; color: var(--papier); background: var(--encre); box-shadow: -1rem 1rem 0 rgba(177,69,53,.28); }
	.escale figure { margin: 0; min-height: 0; }
	.escale img { width: 100%; height: calc(100% - 1rem); object-fit: cover; filter: saturate(.7); }
	.escale figcaption { color: #8ca0a2; font-size: .45rem; }
	.escale > div { align-self: center; }
	.escale h3 { margin: .55rem 0 .8rem; font: 400 1.65rem/1 Georgia,serif; }
	.escale blockquote { margin: 0; color: #d7aa6d; font: italic .78rem/1.4 Georgia,serif; }
	.escale p { margin-top: 1.2rem; padding-top: .6rem; border-top: 1px solid rgba(240,234,220,.35); font-size: .62rem; line-height: 1.5; }

	@media (max-width: 700px) {
		header { height: 4.4rem; padding: .7rem 1rem; grid-template-columns: 1fr 1fr; }
		header p span, header em, header div span { display: none; }
		header p strong { margin: 0; font-size: .84rem; }
		header div { text-align: right; }
		header h1 { font-size: .62rem; }
		.territoire { height: calc(100svh - 4.4rem); min-height: 0; padding: .8rem 1rem; }
		.appel { position: relative; left: auto; top: auto; height: 5rem; }
		.appel h2 { margin: .25rem 0; font-size: 1.75rem; }
		.courants { left: 1rem; right: 1rem; top: 6.1rem; width: auto; display: grid; grid-template-columns: 1fr 1fr; gap: 0 .7rem; }
		.courants button { height: 3.15rem; }
		.courants button span { font-size: .68rem; line-height: 1; }
		.courants button small { display: none; }
		.carte-generale { inset: auto 0 1.2rem; height: 53%; transform: scale(1.45); transform-origin: 70% 100%; }
		.carte-generale .courant { stroke-width: calc(var(--epaisseur) * 1.2); }
		.note { left: 1rem; right: 1rem; bottom: .65rem; width: auto; font-size: .5rem; }
		.atlas-ouvert { height: calc(100svh - 4.4rem); min-height: 0; display: block; }
		.atlas-ouvert nav { height: 6rem; padding: .3rem 1rem; border-right: 0; border-bottom: 1px solid rgba(24,52,58,.4); overflow: hidden; }
		.retour { margin: 0 0 .3rem; padding: 0; font-size: .63rem; }
		.atlas-ouvert nav div { display: grid; grid-template-columns: repeat(4,minmax(0,1fr)); gap: .25rem .4rem; }
		.atlas-ouvert nav span { min-width: 0; display: block; font-size: .43rem; }
		.atlas-ouvert nav span i { display: none; }
		.atlas-ouvert nav span b { display: block; }
		.atlas-ouvert nav span.actif { margin: 0; padding: .25rem; }
		.feuille { height: calc(100% - 6rem); }
		.titre-selection { left: 1rem; top: .75rem; }
		.titre-selection h2 { font-size: 2.35rem; }
		.titre-selection p { margin-top: .35rem; font-size: .48rem; }
		.archipel { left: 1rem; top: 6rem; width: 9.5rem; }
		.archipel button { min-height: 2.2rem; grid-template-columns: .8rem 1fr; }
		.archipel button strong { font-size: .62rem; }
		.archipel button small { grid-column: 2; font-size: .45rem; }
		.archipel button:nth-of-type(n+5) { display: none; }
		.geographie { inset: 5rem -9rem 0 4rem; width: calc(100% + 5rem); height: 58%; }
		.mode-emploi { left: 11.5rem; right: 1rem; bottom: 1rem; width: auto; }
		.detail .archipel button:not(:first-of-type) { display: none; }
		.detail .geographie { height: 43%; }
		.escale { left: 1rem; right: 1rem; bottom: .8rem; width: auto; height: 15rem; grid-template-columns: 7.7rem 1fr; gap: .8rem; padding: .7rem; box-shadow: -.4rem .4rem 0 rgba(177,69,53,.28); }
		.escale h3 { margin: .35rem 0 .5rem; font-size: 1.12rem; }
		.escale blockquote { font-size: .65rem; }
		.escale p { margin-top: .6rem; font-size: .54rem; }
	}
</style>
