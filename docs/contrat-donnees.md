# Contrat de données 0.1

Le dossier `static/data/` contient un snapshot produit par `npm run sync:data`. Le fichier
`manifest.webapp.json` identifie la version du contrat, la version de Joconde et le commit
du dépôt source.

## Fichiers consommés

| Fichier | Rôle |
| --- | --- |
| `artistes.json` | Répertoire, totaux, profils et musées par artiste |
| `oeuvres/<slug>.json` | Notices concernées d'un artiste |
| `musees.json` | Référentiel des musées et coordonnées |
| `corpus_maitres.json` | Unités et agrégats du volume |
| `niveaux.json` | Comptages nationaux et familles détectées |
| `portraits.json` | Portraits validés, sources et crédits |
| `images_index.json` | Métadonnées des reproductions validées, sans les binaires |
| `provenance.json` | Source, licence et version des données Joconde |
| `registre.json` | État d'instruction des formes candidates |
| `territoires.json` | Référentiel géographique utilisé par la carte |

## Invariants initiaux

Le script refuse la synchronisation si :

- le répertoire des artistes est vide ;
- deux artistes partagent le même slug ;
- les unités du corpus manquent ;
- la version de provenance manque.

Le contrat 0.1 conserve encore certaines structures historiques du site source. Avant le
MVP, elles devront être projetées dans des schémas propres à la webapp. Tout changement
incompatible entraînera une nouvelle version majeure du contrat.

## Unités

Les exports comptent d'abord des notices Joconde. L'interface peut employer « œuvre » pour
la lecture publique lorsque le contexte le permet, mais le contrat doit conserver l'unité
réelle et ne jamais transformer silencieusement une notice en objet matériel unique.

