# Roadmap de lancement

## Phase 0 - Socle indépendant

- [x] Créer un dépôt et un historique Git distincts.
- [x] Écrire la relation avec le dépôt source.
- [x] Ajouter une synchronisation reproductible des exports.
- [x] Versionner un premier snapshot sans reproductions binaires.
- [x] Vérifier le chargement par un écran technique minimal.

## Phase 1 — Cadrage éditorial et angle

**Statut : terminée.**

- [x] Formuler clairement l'angle datajournalistique.
- [x] Définir ce que le lecteur doit pouvoir découvrir et comprendre.
- [x] Définir les principaux gestes d'exploration, sans personas ni publics cibles.
- [x] Définir le périmètre documentaire de la webapp et le traitement des contenus indisponibles.
- [x] Choisir le nom public et la relation visible avec le site éditorial.

## Phase 2 — Préparation des données pour la visualisation

**Statut : terminée.**

- [x] Relier les cinq gestes d'exploration validés aux champs et fichiers déjà disponibles.
- [x] Définir et produire uniquement les structures supplémentaires nécessaires pour relier formulations, artistes, notices et lieux.
- [x] Séparer les données descriptives, les métadonnées d'images et les fichiers binaires, en conservant sources, crédits, licences et restrictions.
- [x] Ajouter les vérifications minimales garantissant les identifiants, les relations, les comptages essentiels et la provenance du snapshot.

## Phase 3 — Laboratoire visuel et prototype d'exploration

- [x] Matérialiser trois systèmes visuels différents à partir des mêmes données réelles, avec une vue générale, une sélection et une adaptation mobile.
- [x] Comparer les propositions selon les critères éditoriaux et visuels du projet, puis choisir une direction lors d'un point de contrôle : la Matrice.
- [ ] Construire un prototype interactif de la direction retenue sur un échantillon représentatif, en mettant en œuvre les cinq gestes d'exploration.
- [ ] Vérifier l'expérience sur ordinateur et téléphone : clavier, toucher, réversibilité, contenus indisponibles et états significatifs partageables.
- [ ] Valider le prototype avant son extension au corpus complet et la généralisation du design.

**Note :**

- La phase doit commencer sur une branche expérimentale dédiée.
- Les trois propositions doivent être matériellement visibles et comparables, pas seulement décrites.
- Elles doivent utiliser les mêmes données et montrer les mêmes états.
- Aucune direction ne sera intégrée à `main` avant validation.
- L'originalité de la forme, sa cohérence avec un sujet consacré à l'art, sa lisibilité et son fonctionnement mobile sont des critères centraux.
- Les décisions et les avis successifs du laboratoire sont consignés dans [comparaison-laboratoire-visuel.md](comparaison-laboratoire-visuel.md).

## Phase 4 - Comparaison et montée en charge

- [ ] Comparer deux ou trois profils sur une même échelle.
- [ ] Charger les détails par artiste à la demande.
- [ ] Mesurer recherche, filtres, carte et longues listes sur le corpus complet.
- [ ] Décider sur mesures si un backend devient nécessaire.
