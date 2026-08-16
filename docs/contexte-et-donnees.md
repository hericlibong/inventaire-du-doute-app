# Contexte et relation avec le projet source

## Deux produits complémentaires

Le dépôt `inventaire-du-doute` publie un site éditorial de données interactif. Il présente
le sujet, documente la méthode et introduit les résultats par volumes.

Ce dépôt construit une webapp distincte. Sa fonction principale est d'explorer, filtrer,
comparer et partager des états précis des mêmes données. Il ne doit pas reproduire les
chapitres éditoriaux du premier site.

### Nom public et relation entre les deux réalisations

Le nom public de la webapp reste *L'inventaire du doute*. Le site existant et la webapp
sont deux réalisations distinctes issues du même projet et des mêmes données : le premier
adopte une forme éditoriale organisée en volumes ; la seconde, une forme applicative
centrée sur l'exploration interactive.

La webapp ne reprend pas le sous-titre « Autour des maîtres ». « Les mots du doute » reste
le titre de travail de son angle éditorial, sans devenir pour l'instant un nom public.

Aucune sous-marque, architecture de nom ou identité commune détaillée n'est définie à ce
stade. La formulation exacte des liens entre les deux sites, les titres de page, les
métadonnées et les adresses publiques sera ajustée au moment de la publication.

## Cadrage éditorial

La webapp est une datavisualisation interactive à vocation datajournalistique, destinée au
public général sur ordinateur comme sur téléphone. Son angle est de rendre visible et
explorable la manière dont les musées expriment une incertitude d'attribution autour des
artistes dans la base Joconde.

L'expérience doit privilégier la clarté de cet angle, la qualité et l'originalité de la
représentation des données, ainsi que des gestes d'exploration efficaces. Elle n'est ni un
produit commercial ni un logiciel métier et n'est pas structurée autour de personas.

### Angle directeur — Les mots du doute

**Question centrale :** Comment les musées écrivent-ils qu'ils ne sont pas certains de
l'auteur d'une œuvre, et que révèle la mise en relation de ces formulations avec les
artistes, les œuvres et les lieux concernés ?

**Promesse éditoriale :** Partir des mots publiés dans Joconde pour explorer les liens
qu'ils établissent entre une œuvre, un nom d'artiste et un musée.

Les formulations constituent la colonne vertébrale de l'exploration. Le lecteur doit
pouvoir circuler depuis ces mots vers les artistes, les œuvres et les musées dans un même
système visuel interactif.

Les versements dans Joconde étant volontaires et inégaux, l'application n'établit aucun
classement entre les musées et n'interprète pas leurs pratiques documentaires. La forme
graphique reste à rechercher : la cartographie relationnelle est une piste, non une
décision, et devra être confrontée aux exigences d'originalité, de lisibilité et d'usage
sur mobile.

### Ce que le lecteur doit pouvoir découvrir et comprendre

#### 1. L'incertitude ne s'écrit pas d'une seule manière

**Constat dans les données :** Dans les 6 081 notices concernées, les musées emploient
différentes formulations pour préciser le lien entre une œuvre et un nom d'artiste, comme
« attribué à », « école de », « atelier de », « entourage de » ou « manière de ». Le projet
reproduit ces formulations et regroupe leurs variantes d'écriture en huit catégories
fidèles aux conventions de Joconde, avec des libellés adaptés à la lecture.

**Ce que leur rapprochement permet de comprendre :** Ces formulations décrivent des
relations différentes entre l'œuvre et le nom d'artiste ; elles ne sont ni interchangeables
ni de simples variantes stylistiques d'un même doute.

#### 2. Un même artiste peut être entouré de plusieurs formes d'incertitude

**Constat dans les données :** Pour chacun des 102 artistes, le corpus relie les
formulations aux notices concernées et aux musées qui les conservent. Leur nombre et leur
répartition varient selon les artistes.

**Ce que leur mise en relation permet de comprendre :** Le nom d'un artiste ne renvoie pas
à un ensemble homogène d'œuvres incertaines, mais à plusieurs types de liens documentaires
qu'il faut distinguer.

#### 3. Une notice peut faire intervenir plusieurs noms d'artistes

**Constat dans les données :** 6 081 notices produisent 6 238 associations entre notices
et artistes ; 157 notices sont ainsi reliées à plusieurs artistes du corpus.

**Ce que leur mise en relation permet de comprendre :** L'incertitude ne forme pas
seulement une série de cas isolés. Certaines œuvres relient plusieurs noms et plusieurs
formulations, faisant apparaître une structure relationnelle invisible dans une consultation
notice par notice.

#### 4. Ces formulations sont réparties entre de nombreux lieux

**Constat dans les données :** Chaque association peut être reliée à un musée, une ville,
un département ou une région. On peut donc observer où apparaissent les différentes
formulations et quels artistes elles concernent.

**Ce que leur mise en relation permet de comprendre :** Un même vocabulaire ou un même nom
d'artiste peut traverser plusieurs collections et territoires, tandis que certains
ensembles restent concentrés dans quelques lieux.

### Limites d'interprétation

- Une formulation décrit le contenu d'une notice ; elle ne mesure pas une probabilité
  d'attribution et ne permet pas d'ordonner mécaniquement les cas du « plus certain » au
  « moins certain ».
- Une association avec un artiste ne signifie pas que le musée affirme que cet artiste est
  l'auteur.
- Les écarts entre musées ou territoires ne permettent ni classement ni jugement sur leurs
  pratiques : les versements dans Joconde sont volontaires, inégaux et non exhaustifs.
- L'unité comptée est la notice Joconde. Une notice ne doit pas être assimilée
  silencieusement à un objet matériel unique.

### Gestes d'exploration

#### 1. Partir d'une formulation

L'exploration générale part des formulations, tandis qu'un accès direct permet de
retrouver un élément déjà connu. Le lecteur choisit une formulation ou une famille de
variantes pour découvrir les artistes, les œuvres et les lieux auxquels ces mots sont
associés. La formulation choisie, ses variantes regroupées, son poids dans le corpus et le
périmètre observé restent conservés.

#### 2. Retrouver un cas précis

À partir d'un nom d'artiste, d'un titre d'œuvre, d'une formulation ou d'un lieu déjà connu,
le lecteur retrouve directement cet élément dans le corpus et découvre sa place dans
l'ensemble des formulations, œuvres, artistes et musées auxquels il est relié. Le périmètre
du résultat et la catégorie dans laquelle il apparaît restent conservés.

#### 3. Replacer les cas dans les lieux

À partir d'une formulation, d'un artiste ou d'une œuvre, le lecteur observe où les
occurrences correspondantes sont conservées, puis poursuit depuis un musée ou un
territoire. Il découvre leur dispersion ou leur concentration sans perdre le critère
d'origine ni les limites du corpus ; ce déplacement ne constitue pas un classement des
lieux.

#### 4. Changer d'échelle ou comparer

À partir d'un ensemble observé, le lecteur élargit vers le corpus, resserre vers un cas
précis ou rapproche deux ensembles selon une même dimension. Les critères comparés, leurs
unités, leurs volumes respectifs et le périmètre de référence restent conservés. La
comparaison demeure descriptive.

#### 5. Revenir aux mots publiés

À partir de toute relation agrégée ou de tout cas particulier, le lecteur retrouve
l'extrait exact de la notice, puis sa source Joconde. L'état de l'exploration reste conservé
afin de permettre un retour au même endroit.

**Principe transversal :** Chaque résultat peut être suivi vers une autre dimension du
corpus. Les déplacements sont réversibles et les sélections restent visibles.

Les états significatifs de l'exploration devront pouvoir être partagés et restaurés. Leur
définition précise est reportée à la conception du prototype, lorsque les états
d'exploration effectivement retenus pourront être testés.

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

## Périmètre documentaire

La webapp exploite l'ensemble du corpus actuel dans ses quatre dimensions : formulations,
artistes, œuvres et lieux. Les cinq gestes d'exploration définis plus haut appartiennent
tous à son objectif final, même si leur réalisation intervient dans différentes phases. La
roadmap fixe un ordre de construction d'une seule webapp complète ; elle ne décrit pas une
succession de versions fonctionnellement incomplètes.

Le snapshot actuel comprend les profils des 102 artistes, le vocabulaire public, les
musées, la provenance et un fichier de détail par artiste.

### Images et contenus indisponibles

Les portraits validés et les reproductions autorisées ou librement réutilisables pourront
être affichés avec leurs sources et leurs crédits. L'absence d'une image ne doit jamais
empêcher l'accès aux données descriptives d'une œuvre ou d'un artiste.

Le traitement visuel et le libellé des contenus sans image seront décidés pendant la
conception de l'interface. De nouvelles images autorisées devront pouvoir enrichir les
données ultérieurement sans nécessiter une refonte de l'application. Les fichiers binaires
des reproductions et des portraits sont désormais synchronisés séparément de leurs
métadonnées, en conservant la source, le crédit, la licence et les éventuelles restrictions
de chaque fichier.

### Limites permanentes du périmètre

- Les données présentées correspondent à un snapshot daté de Joconde et ne prétendent pas
  constituer un corpus exhaustif des collections ou des versements.
- La webapp n'authentifie ni ne réattribue les œuvres.
- Elle n'établit aucun classement entre les musées.
- Elle conserve la distinction entre une notice Joconde et un objet matériel.
