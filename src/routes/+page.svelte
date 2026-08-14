<script>
	let { data } = $props();
	let recherche = $state('');
	let selection = $state('');

	let resultats = $derived(
		data.artistes.filter((artiste) =>
			artiste.nom.toLocaleLowerCase('fr').includes(recherche.trim().toLocaleLowerCase('fr'))
		)
	);
	let artiste = $derived(
		data.artistes.find((entree) => entree.slug === selection) ?? resultats[0] ?? null
	);
</script>

<svelte:head>
	<title>L'inventaire du doute - Webapp</title>
	<meta
		name="description"
		content="Socle de la future application d'exploration des données de L'inventaire du doute."
	/>
</svelte:head>

<main>
	<header class="barre">
		<div>
			<p class="produit">L'inventaire du doute</p>
			<h1>Explorer les données</h1>
		</div>
		<p class="version">Contrat {data.manifeste.contractVersion}</p>
	</header>

	<div class="outil">
		<aside>
			<label for="recherche">Rechercher un artiste</label>
			<input id="recherche" bind:value={recherche} type="search" placeholder="Rembrandt, Ingres..." />
			<p class="compte">{resultats.length} artiste{resultats.length > 1 ? 's' : ''}</p>
			<ul>
				{#each resultats as entree (entree.slug)}
					<li>
						<button
							type="button"
							class:actif={artiste?.slug === entree.slug}
							onclick={() => (selection = entree.slug)}
						>
							<span>{entree.nom}</span>
							<strong>{entree.doute}</strong>
						</button>
					</li>
				{/each}
			</ul>
		</aside>

		<section class="profil" aria-live="polite">
			{#if artiste}
				<p class="repere">Premier contrôle du contrat de données</p>
				<h2>{artiste.nom}</h2>
				<div class="indicateurs">
					<p><strong>{artiste.doute}</strong><span>œuvres concernées</span></p>
					<p><strong>{artiste.nb_musees_doute}</strong><span>musées</span></p>
					<p><strong>{artiste.familles.length}</strong><span>mentions présentes</span></p>
				</div>

				<h3>Répartition publiée</h3>
				<ul class="mentions">
					{#each artiste.familles as famille}
						<li>
							<span>{famille.libelle}</span>
							<strong>{famille.notices}</strong>
						</li>
					{/each}
				</ul>
				<p class="note">
					Cet écran vérifie le chargement, la recherche et les unités. Le parcours et la direction
					visuelle définitifs seront conçus lors du prototype produit.
				</p>
			{:else}
				<p>Aucun artiste ne correspond à cette recherche.</p>
			{/if}
		</section>
	</div>
</main>
