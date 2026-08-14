# Contexte et relation avec le projet source

## Deux produits complémentaires

Le dépôt `inventaire-du-doute` publie un site éditorial de données interactif. Il présente
le sujet, documente la méthode et introduit les résultats par volumes.

Ce dépôt construit une webapp distincte. Sa fonction principale est d'explorer, filtrer,
comparer et partager des états précis des mêmes données. Il ne doit pas reproduire les
chapitres éditoriaux du premier site.

## Une seule source de vérité

Le dépôt source reste seul responsable de la lecture de Joconde, de la détection des
formulations, de la désambiguïsation des artistes, des comptages, de la classification et
de la validation des images.

La webapp :

- ne lit pas le CSV Joconde ;
- ne maintient pas de seconde liste d'artistes ;
- ne recalcule pas les catégories ou les totaux ;
- consomme un snapshot explicite des exports publics ;
- affiche la version et le commit source dans son manifeste.

Une correction de donnée doit donc être faite et testée dans le dépôt source, puis intégrée
ici par une nouvelle synchronisation.

## Périmètre initial

Le premier snapshot comprend les profils des 102 artistes, le vocabulaire public, les
musées, la provenance et un fichier de détail par artiste. Les fichiers binaires des
reproductions ne sont pas copiés : leur source, leur crédit, leur licence et leur éventuelle
restriction devront être traités par un contrat d'images séparé.

