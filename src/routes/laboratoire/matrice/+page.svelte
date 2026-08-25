<script>
	import { onMount } from 'svelte';

	let { data } = $props();
	let etape = $state('ensemble');

	onMount(() => {
		if (new URLSearchParams(window.location.search).get('etat') === 'selection') etape = 'artiste';
	});
	let max = $derived({
		total: Math.max(...data.categories.map((categorie) => categorie.total)),
		artistes: Math.max(...data.categories.map((categorie) => categorie.artistes)),
		musees: Math.max(...data.categories.map((categorie) => categorie.musees)),
		artiste: Math.max(...data.artistes.map((artiste) => artiste.total))
	});

	function selectionnerCategorie() { etape = 'categorie'; }
	function selectionnerArtiste() { etape = 'artiste'; }
	function retour() { etape = etape === 'artiste' ? 'categorie' : 'ensemble'; }
	function largeur(valeur, maximum) { return Math.max(7, Math.round((valeur / maximum) * 100)); }
</script>

<svelte:head>
	<title>Matrice évolutive — Laboratoire</title>
	<meta name="description" content="Prototype matriciel des formulations du doute." />
</svelte:head>

<main class="matrice" class:selection={etape !== 'ensemble'} class:detail={etape === 'artiste'}>
	<header>
		<p><span>Laboratoire 02</span><strong>L’inventaire du doute</strong></p>
		<div>
			<h1>Matrice évolutive</h1>
			<span>Lire les densités, ouvrir une trame</span>
		</div>
		<em>{etape === 'ensemble' ? '8 formulations × 3 dimensions' : 'école de · 1 343 occurrences'}</em>
	</header>

	{#if etape === 'ensemble'}
		<section class="planche">
			<div class="introduction">
				<span>Les mots en premier</span>
				<h2>Une même trame,<br />trois mesures</h2>
				<p>Les aplats comparent les notices, les noms d’artistes et les institutions sans effacer les petits nombres.</p>
				<small>Choisir la ligne <strong>école de</strong> →</small>
			</div>

			<div class="surface" aria-label="Matrice des formulations, artistes et musées">
				<div class="colonnes">
					<span>formulation / occurrences</span><span>artistes liés</span><span>musées présents</span>
				</div>
				{#each data.categories as categorie, index (categorie.code)}
					<button
						type="button"
						class="ligne"
						class:cible={categorie.code === 'ecole_de'}
						style={`--rang:${index}`}
						onclick={categorie.code === 'ecole_de' ? selectionnerCategorie : undefined}
					>
						<span class="libelle"><i>{String(index + 1).padStart(2, '0')}</i><strong>{categorie.libelle}</strong><b>{categorie.total.toLocaleString('fr-FR')}</b></span>
						<span class="mesure pigment" style={`--largeur:${largeur(categorie.total, max.total)}%`}><i></i><b>{categorie.total.toLocaleString('fr-FR')}</b></span>
						<span class="mesure artiste" style={`--largeur:${largeur(categorie.artistes, max.artistes)}%`}><i></i><b>{categorie.artistes}</b></span>
						<span class="mesure musee" style={`--largeur:${largeur(categorie.musees, max.musees)}%`}><i></i><b>{categorie.musees}</b></span>
						{#if categorie.code === 'ecole_de'}<em>déplier la ligne</em>{/if}
					</button>
				{/each}
				<p class="echelle"><span>surface proportionnelle</span><span>minimum visible</span></p>
			</div>
		</section>
	{:else}
		<section class="deplie">
			<nav aria-label="Retour et contexte">
				<button type="button" onclick={retour}>← Replier</button>
				<div>
					{#each data.categories as categorie, index (categorie.code)}
						<span class:actif={categorie.code === 'ecole_de'}><i>{String(index + 1).padStart(2, '0')}</i>{categorie.libelle}<b>{categorie.total.toLocaleString('fr-FR')}</b></span>
					{/each}
				</div>
			</nav>

			<div class="trame">
				<div class="entete-trame">
					<span>03 / formulation ouverte</span>
					<h2>école de</h2>
					<p><strong>{data.categorie.total.toLocaleString('fr-FR')}</strong> occurrences <i></i> <strong>{data.categorie.artistes}</strong> artistes <i></i> <strong>{data.categorie.musees}</strong> musées</p>
				</div>

				<div class="noms" aria-label="Artistes et nombres de notices associés">
					{#each data.artistes.slice(0, 10) as artiste, index (artiste.slug)}
						<button
							type="button"
							class:charles={artiste.slug === 'charles-le-brun'}
							class:choisi={etape === 'artiste' && artiste.slug === 'charles-le-brun'}
							style={`--hauteur:${Math.max(18, Math.round((artiste.total / max.artiste) * 100))}%;--index:${index}`}
							onclick={artiste.slug === 'charles-le-brun' ? selectionnerArtiste : undefined}
						>
							<i></i><span>{artiste.nom}</span><strong>{artiste.total}</strong><small>notices</small>
						</button>
					{/each}
				</div>

				{#if etape === 'categorie'}
					<div class="lecture">
						<span>La trame révèle</span>
						<p>Charles Le Brun concentre <strong>240 notices</strong>, avant Le Primatice et Michel-Ange.</p>
						<small>Les artistes minoritaires gardent une largeur constante.</small>
					</div>
				{:else}
					<article class="notice">
						<div class="image">
							<img src={data.notice.image} alt="Sainte Geneviève devant Paris" />
							<span>{data.notice.licence}</span>
						</div>
						<div class="cartel">
							<span>1 notice parmi 240 · {data.notice.reference}</span>
							<h3>{data.notice.titre}</h3>
							<blockquote>«&nbsp;{data.notice.extrait}&nbsp;»</blockquote>
							<p><strong>{data.musee.nom}</strong><br />{data.musee.ville}, {data.musee.departement}</p>
						</div>
					</article>
				{/if}
			</div>
		</section>
	{/if}
</main>

<style>
	:global(body) { background: #e9e3d6; }
	:global(button) { font: inherit; }
	.matrice {
		--papier: #e9e3d6;
		--encre: #17211d;
		--rouge: #a6352a;
		--bleu: #315f6d;
		--ocre: #bd9250;
		min-height: 100svh;
		color: var(--encre);
		background-color: var(--papier);
		background-image: linear-gradient(rgba(23,33,29,.035) 1px, transparent 1px);
		background-size: 100% 9px;
		overflow: hidden;
	}
	header { height: 6rem; padding: 1rem 2.2rem; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; border-bottom: 2px solid var(--encre); }
	header p, header h1, header em { margin: 0; }
	header p span { display: block; text-transform: uppercase; letter-spacing: .16em; font-size: .57rem; }
	header p strong { display: block; margin-top: .25rem; font: 400 1rem Georgia,serif; }
	header div { text-align: center; }
	header h1 { text-transform: uppercase; letter-spacing: .08em; font: 700 1rem system-ui,sans-serif; }
	header div span { color: #6d716c; font: italic .76rem Georgia,serif; }
	header em { justify-self: end; font: normal .64rem/1.4 monospace; }
	.planche { height: calc(100svh - 6rem); min-height: 45rem; display: grid; grid-template-columns: minmax(15rem, 23%) 1fr; gap: 3.5rem; max-width: 90rem; margin: auto; padding: 3rem 2.2rem 2rem; }
	.introduction { padding-top: 2.5rem; }
	.introduction > span, .entete-trame > span, .lecture > span { color: var(--rouge); text-transform: uppercase; letter-spacing: .18em; font: 700 .6rem system-ui,sans-serif; }
	.introduction h2 { margin: .75rem 0 1.2rem; font: 400 clamp(2.1rem,3.1vw,3.4rem)/.95 Georgia,serif; }
	.introduction p { max-width: 15rem; color: #5f625d; font-size: .78rem; line-height: 1.55; }
	.introduction small { display: block; margin-top: 4rem; padding-top: .7rem; border-top: 1px solid var(--encre); font-size: .68rem; }
	.surface { align-self: start; }
	.colonnes { display: grid; grid-template-columns: 1.55fr 1fr 1fr 1fr; height: 2.5rem; align-items: end; padding-bottom: .55rem; border-bottom: 1px solid var(--encre); }
	.colonnes span:first-child { grid-column: 1/3; }
	.colonnes span { color: #6d716c; text-transform: uppercase; letter-spacing: .12em; font-size: .54rem; }
	.ligne { position: relative; width: 100%; height: clamp(3.8rem,7.2vh,4.8rem); display: grid; grid-template-columns: 1.55fr 1fr 1fr 1fr; gap: .5rem; align-items: stretch; padding: .35rem 0; color: inherit; border: 0; border-bottom: 1px solid rgba(23,33,29,.48); background: transparent; text-align: left; cursor: default; }
	.ligne:nth-of-type(odd) { transform: translateX(.3rem); }
	.libelle { display: grid; grid-template-columns: 1.8rem 1fr auto; align-items: center; gap: .45rem; min-width: 0; }
	.libelle i { color: #89877f; font: normal .58rem monospace; }
	.libelle strong { font: 400 clamp(.78rem,1.08vw,1rem) Georgia,serif; }
	.libelle b { padding-right: .35rem; font: 700 .65rem monospace; }
	.mesure { position: relative; display: flex; align-items: center; padding: .3rem; overflow: hidden; }
	.mesure i { position: absolute; left: 0; top: 18%; width: var(--largeur); height: 64%; opacity: .9; transform: skewX(-3deg); }
	.mesure b { position: relative; z-index: 1; margin-left: .35rem; color: var(--papier); mix-blend-mode: difference; font: 700 .62rem monospace; }
	.pigment i { background: var(--rouge); }
	.artiste i { background: var(--bleu); top: 25%; height: 55%; }
	.musee i { background: var(--ocre); top: 12%; height: 70%; }
	.ligne > em { display: none; position: absolute; right: .3rem; top: .15rem; color: var(--rouge); text-transform: uppercase; letter-spacing: .12em; font: normal .5rem system-ui,sans-serif; }
	.ligne.cible { cursor: pointer; box-shadow: inset 3px 0 var(--rouge); }
	.ligne.cible > em { display: block; }
	.ligne.cible:hover, .ligne.cible:focus-visible { background: rgba(166,53,42,.06); outline: none; }
	.echelle { display: flex; justify-content: space-between; margin: .65rem 0 0; color: #87867f; font: .54rem monospace; }
	.deplie { height: calc(100svh - 6rem); min-height: 45rem; display: grid; grid-template-columns: 12rem 1fr; max-width: 90rem; margin: auto; }
	.deplie nav { padding: 1.2rem 1rem 1rem 2rem; border-right: 1px solid var(--encre); }
	.deplie nav > button { margin-bottom: 2rem; padding: .4rem 0; border: 0; border-bottom: 1px solid var(--encre); background: none; cursor: pointer; }
	.deplie nav div { display: grid; gap: .8rem; }
	.deplie nav span { display: grid; grid-template-columns: 1.6rem 1fr; gap: .2rem; color: #8a8880; font: .64rem/1.15 Georgia,serif; }
	.deplie nav span i { grid-row: 1/3; font: normal .5rem monospace; }
	.deplie nav span b { font: 500 .52rem monospace; }
	.deplie nav span.actif { margin: .3rem -.5rem; padding: .6rem .5rem; color: var(--papier); background: var(--rouge); }
	.trame { position: relative; padding: 1.8rem 2rem 1.3rem 2.5rem; overflow: hidden; }
	.entete-trame { height: 8.8rem; border-bottom: 2px solid var(--encre); }
	.entete-trame h2 { display: inline-block; margin: .25rem 1rem .3rem 0; font: 400 clamp(2.8rem,5vw,5rem)/1 Georgia,serif; }
	.entete-trame p { display: inline-flex; gap: .5rem; align-items: center; margin: 0; color: #6f716c; font-size: .68rem; }
	.entete-trame p i { width: .25rem; height: .25rem; background: var(--rouge); border-radius: 50%; }
	.noms { height: calc(100% - 11rem); min-height: 27rem; display: grid; grid-template-columns: repeat(10, 1fr); gap: .4rem; padding-top: 1.1rem; transition: width .3s ease; }
	.noms button { position: relative; height: 100%; min-width: 0; padding: 0 .35rem .6rem; color: inherit; border: 0; border-left: 1px solid rgba(23,33,29,.35); background: transparent; cursor: default; text-align: left; overflow: hidden; }
	.noms button > i { position: absolute; left: .25rem; right: .25rem; bottom: .5rem; height: var(--hauteur); background: var(--bleu); opacity: calc(.84 - var(--index) * .045); transform: skewY(calc((var(--index) - 4) * .35deg)); transform-origin: bottom; }
	.noms button span { position: relative; z-index: 1; display: block; writing-mode: vertical-rl; transform: rotate(180deg); font: 400 clamp(.65rem,.9vw,.86rem) Georgia,serif; }
	.noms button strong { position: absolute; z-index: 1; left: .35rem; bottom: .75rem; color: var(--papier); font: 700 .7rem monospace; }
	.noms button small { position: absolute; z-index: 1; left: .35rem; bottom: 1.65rem; color: rgba(233,227,214,.75); font-size: .48rem; writing-mode: vertical-rl; }
	.noms button.charles { cursor: pointer; }
	.noms button.charles > i { background: var(--rouge); opacity: 1; }
	.noms button.charles::after { content: 'ouvrir'; position: absolute; z-index: 2; right: .25rem; top: 0; color: var(--rouge); text-transform: uppercase; font-size: .45rem; writing-mode: vertical-rl; }
	.noms button.choisi span { color: var(--rouge); font-weight: 700; }
	.lecture { position: absolute; right: 2rem; bottom: 2rem; z-index: 2; width: 15rem; padding: 1rem; color: var(--papier); background: var(--encre); box-shadow: -.6rem .6rem 0 rgba(166,53,42,.45); }
	.lecture p { font: 400 1.1rem/1.25 Georgia,serif; }
	.lecture small { color: #aaa99f; font-size: .58rem; }
	.detail .noms { width: 55%; grid-template-columns: repeat(5, 1fr); }
	.detail .noms button:nth-child(n+6) { display: none; }
	.notice { position: absolute; right: 2rem; top: 10.8rem; bottom: 1.8rem; width: 40%; display: grid; grid-template-columns: minmax(8rem,45%) 1fr; gap: 1rem; padding-left: 1rem; border-left: 2px solid var(--encre); background: var(--papier); }
	.image { align-self: stretch; position: relative; overflow: hidden; }
	.image img { width: 100%; height: 100%; object-fit: cover; filter: saturate(.65); }
	.image > span { position: absolute; left: .4rem; bottom: .4rem; padding: .2rem; color: var(--papier); background: var(--encre); font-size: .48rem; }
	.cartel { align-self: center; }
	.cartel > span { color: var(--rouge); text-transform: uppercase; letter-spacing: .12em; font-size: .52rem; }
	.cartel h3 { margin: .55rem 0 .75rem; font: 400 clamp(1.25rem,2vw,2rem)/1 Georgia,serif; }
	.cartel blockquote { margin: 0; color: var(--bleu); font: italic .8rem/1.4 Georgia,serif; }
	.cartel p { margin-top: 1.4rem; padding-top: .7rem; border-top: 1px solid var(--encre); font-size: .65rem; line-height: 1.45; }

	@media (max-width: 700px) {
		header { height: 4.5rem; padding: .7rem 1rem; grid-template-columns: 1fr 1fr; }
		header p span, header em, header div span { display: none; }
		header p strong { margin: 0; font-size: .84rem; }
		header div { text-align: right; }
		header h1 { font-size: .64rem; }
		.planche { height: calc(100svh - 4.5rem); min-height: 0; display: block; padding: .9rem 1rem; }
		.introduction { height: 6.5rem; padding: 0; display: grid; grid-template-columns: 1fr 1fr; align-items: end; }
		.introduction > span { grid-column: 1/3; }
		.introduction h2 { margin: .2rem 0 0; font-size: 1.65rem; }
		.introduction p { margin: 0; font-size: .61rem; line-height: 1.35; }
		.introduction small { display: none; }
		.colonnes { height: 2rem; grid-template-columns: 1.45fr .8fr .8fr; }
		.colonnes span:first-child { grid-column: auto; }
		.colonnes span:nth-child(2) { text-align: center; }
		.colonnes span { font-size: .43rem; }
		.ligne { height: calc((100svh - 15.3rem) / 8); min-height: 3.2rem; grid-template-columns: 1.45fr .8fr .8fr; gap: .2rem; padding: .2rem 0; }
		.libelle { grid-template-columns: 1.1rem 1fr auto; gap: .2rem; }
		.libelle strong { font-size: .68rem; line-height: 1; }
		.libelle b, .libelle i { font-size: .48rem; }
		.mesure.pigment { display: none; }
		.mesure b { font-size: .48rem; }
		.ligne > em { display: none; }
		.echelle { display: none; }
		.deplie { height: calc(100svh - 4.5rem); min-height: 0; display: block; }
		.deplie nav { height: 6rem; padding: .3rem 1rem; border-right: 0; border-bottom: 1px solid var(--encre); overflow: hidden; }
		.deplie nav > button { margin: 0 0 .3rem; padding: 0; font-size: .65rem; }
		.deplie nav div { display: grid; grid-template-columns: repeat(4,minmax(0,1fr)); gap: .25rem .4rem; }
		.deplie nav span { min-width: 0; display: block; font-size: .43rem; }
		.deplie nav span i { display: none; }
		.deplie nav span b { display: block; }
		.deplie nav span.actif { margin: 0; padding: .25rem; }
		.trame { height: calc(100% - 6rem); padding: .8rem 1rem; }
		.entete-trame { height: 6rem; }
		.entete-trame h2 { display: block; margin: .15rem 0; font-size: 2.4rem; }
		.entete-trame p { font-size: .53rem; }
		.noms { height: 16rem; min-height: 0; grid-template-columns: repeat(5,1fr); padding-top: .7rem; }
		.noms button:nth-child(n+6) { display: none; }
		.noms button span { font-size: .6rem; }
		.lecture { left: 1rem; right: 1rem; bottom: 1rem; width: auto; padding: .8rem; }
		.lecture p { margin: .5rem 0; font-size: .9rem; }
		.detail .noms { width: 100%; height: 7rem; grid-template-columns: repeat(5,1fr); }
		.detail .noms button:not(:first-child) { opacity: .35; }
		.notice { left: 1rem; right: 1rem; top: 14.2rem; bottom: .5rem; width: auto; grid-template-columns: 7.7rem 1fr; padding: .7rem 0 0; border-left: 0; border-top: 2px solid var(--encre); }
		.image { max-height: 13rem; }
		.cartel h3 { font-size: 1.18rem; }
		.cartel blockquote { font-size: .67rem; }
		.cartel p { margin-top: .7rem; font-size: .58rem; }
	}
</style>
