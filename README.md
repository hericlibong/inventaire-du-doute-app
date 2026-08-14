# L'inventaire du doute - Webapp

Projet distinct du [site editorial](https://hericlibong.github.io/inventaire-du-doute/),
consacre a l'exploration intensive des donnees de *L'inventaire du doute*.

Cette application doit permettre de rechercher, filtrer et comparer les artistes, les
formulations, les oeuvres et les musees. Elle ne recalcule aucune donnee Joconde : elle
consomme les exports valides et versionnes produits par le depot source
`inventaire-du-doute`.

## Etat du projet

Le depot contient le socle technique et un premier ecran de controle des donnees. Cet
ecran n'est pas une direction d'interface definitive. Il sert a verifier la frontiere entre
le pipeline source et la future application avant le prototypage des parcours.

## Principes

- une seule source de verite pour les donnees et les classifications ;
- un depot et un historique Git independants ;
- une interface centree sur l'action, sans nouvelle page de presentation ;
- un etat partageable par URL ;
- une conception mobile propre, et non une simple reduction du bureau ;
- aucune interpretation plus affirmative que les notices publiees par les musees.

## Donnees

Le snapshot initial est versionne dans `static/data/`. Pour le regenerer depuis un clone
local du depot source :

```bash
npm run sync:data
```

Le script cherche par defaut le depot source dans `../MuseumAtribution`. Un autre chemin
peut etre indique avec `INVENTAIRE_SOURCE`.

Les reproductions d'oeuvres ne sont pas copiees par ce script. Leur integration suivra un
contrat distinct qui conservera la source, le credit, la licence et les restrictions de
chaque fichier.

## Documentation

- [`docs/contexte-et-donnees.md`](docs/contexte-et-donnees.md) : relation avec le projet source ;
- [`docs/contrat-donnees.md`](docs/contrat-donnees.md) : frontiere et invariants des exports ;
- [`docs/roadmap.md`](docs/roadmap.md) : ordre de lancement du produit.

## Auteur et droits

Héric Libong

Les donnees Joconde sont diffusees par le ministere de la Culture sous Licence Ouverte
2.0. Le code et les contenus de ce depot sont, sauf mention contraire, tous droits
reserves. La publication du depot ne vaut pas autorisation de reutilisation.

