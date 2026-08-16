# Contrat de données

Le dossier `static/data/` contient un snapshot produit par `npm run sync:data`. Le fichier
`manifest.webapp.json` identifie sa provenance, notamment la version de Joconde et le
commit du dépôt source.

## Principes de préparation

- Réutiliser les exports existants chaque fois qu'ils répondent déjà au besoin.
- Ne créer aucune duplication ou projection sans utilité démontrée pour la visualisation.
- Conserver les formulations sources et les identifiants Joconde.
- Ne jamais recalculer dans la webapp la classification produite par le dépôt source.
- Limiter les validations automatiques aux erreurs qui rendraient l'exploration fausse ou
  inutilisable.
- Conserver le manifeste pour identifier la provenance du snapshot, sans mettre en place
  maintenant un système complexe de compatibilité ou de versions majeures.

## Conclusions de l'audit des données disponibles

- Les identifiants existants permettent de relier de manière fiable les artistes, les
  notices, les catégories et les musées.
- La projection doit rester limitée à la navigation bidirectionnelle, à la recherche
  transversale, à la géographie des sélections et à la conservation explicite des unités
  de comptage.
- Les comptages nationaux doivent rester distincts de ceux du corpus.
- Les libellés de musées ne doivent jamais servir de clés.
- Les données absentes, notamment certains titres, ne doivent pas être reconstituées.
- Une URL POP explicite devra être disponible dans les données consommées par l'interface.
- Aucun index lexical supplémentaire ne sera créé tant que son utilité pour la
  visualisation n'est pas démontrée.

## Fichiers consommés

| Fichier | Rôle |
| --- | --- |
| `exploration.json` | Projection transversale des catégories, notices uniques et relations artiste-notice |
| `artistes.json` | Répertoire, totaux, profils et musées par artiste |
| `oeuvres/<slug>.json` | Notices concernées d'un artiste |
| `musees.json` | Référentiel des musées et coordonnées |
| `corpus_maitres.json` | Unités et agrégats du volume |
| `niveaux.json` | Comptages nationaux et familles détectées |
| `portraits.json` | Métadonnées des portraits validés, indexées par slug artiste |
| `images_index.json` | Métadonnées des reproductions validées, indexées par référence Joconde |
| `provenance.json` | Source, licence et version des données Joconde |
| `registre.json` | État d'instruction des formes candidates |
| `territoires.json` | Référentiel géographique utilisé par la carte |
| `../oeuvres/` | Fichiers binaires des reproductions référencées par `images_index.json` |
| `../portraits/` | Fichiers binaires des portraits référencés par `portraits.json` |

## Projection transversale

`npm run sync:data` produit `exploration.json` à partir des exports historiques, qui restent
conservés dans le snapshot. L'interface utilisera cette projection pour l'exploration
transversale et ne chargera pas simultanément les 102 fichiers par artiste.

La projection contient chaque notice une seule fois, identifiée par `reference`, avec son
`titre` éventuellement nul, son `musee_code`, son URL POP explicite et ses relations. Chaque
relation conserve le `slug` de l'artiste, le `code` de catégorie produit par le dépôt source
et l'`extrait` exact correspondant. Les portraits et les reproductions n'y sont pas inclus.

Les unités sont déclarées avec leurs clés et leurs effectifs : notice distincte
(`reference`), association artiste-notice (`slug`, `reference`) et occurrence
notice-catégorie (`reference`, `code`). Les huit catégories reprennent leurs libellés et
leurs totaux depuis les agrégats source, sans nouvelle classification.

Les musées concernés par l'exploration sont les 116 codes présents dans les notices de la
projection. Cette liste est déduite de `musee_code` et reliée à `musees.json` ; elle ne
constitue pas un second référentiel.

## Métadonnées et fichiers médias

Les données descriptives restent séparées des médias : `exploration.json` ne contient ni
métadonnée d'image ni fichier binaire. Les deux index médias restent distincts et utilisent
des chemins relatifs au répertoire statique, compatibles avec un chemin de base de
déploiement.

`images_index.json` est indexé par la référence Joconde de la notice. Ses métadonnées sont
recopiées sans modifier les statuts, créateurs, crédits, licences ou sources. Les
métadonnées éventuellement répétées dans les fichiers historiques sont conservées, mais
l'interface devra utiliser l'index comme référence pour les reproductions.

`portraits.json` est indexé dans le snapshot par le `slug` issu d'`artistes.json`. Tous les
champs fournis par la source sont préservés :

- `auteur` désigne l'auteur ou le créateur indiqué ;
- `reproduction` désigne un contributeur ou reproducteur distinct lorsqu'il est renseigné ;
- `source_nom` est le nom public facultatif de la source ;
- `source` est la page d'origine ;
- `licence` et `licence_url` décrivent les conditions de réutilisation publiées.

Aucun statut uniforme ni aucune date de vérification ne sont ajoutés aux portraits lorsque
la source ne les fournit pas. Une notice ou un artiste sans entrée dans son index média
reste valide.

La synchronisation vide les deux répertoires médias du snapshot, vérifie chaque chemin dans
le dépôt source, puis copie uniquement les fichiers explicitement référencés. Elle bloque
si une reproduction ne correspond pas à une notice de `exploration.json`, si un portrait
ne correspond pas à un artiste connu ou si un fichier déclaré est absent. Le manifeste
indique les nombres de reproductions et de portraits disponibles ainsi que la présence des
fichiers binaires.

## Vérifications actuelles

Le script refuse la synchronisation si :

- le répertoire des artistes est vide ;
- deux artistes partagent le même slug ;
- les unités du corpus manquent ;
- la version de provenance manque.
- le commit du dépôt source est absent ou invalide.

La génération de la projection vérifie également les correspondances des slugs, catégories
et codes Muséofile, l'unicité du musée et du titre d'une notice regroupée, les trois
effectifs déclarés et les totaux par catégorie issus de la source.

## Unités

Les exports comptent d'abord des notices Joconde. L'interface peut employer « œuvre » pour
la lecture publique lorsque le contexte le permet, mais le contrat doit conserver l'unité
réelle et ne jamais transformer silencieusement une notice en objet matériel unique.
