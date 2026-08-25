# Comparaison du laboratoire visuel

Cette note rassemble les avis formulés pendant l'examen des propositions de la phase 3. Elle est mise à jour après chaque point discuté. La comparaison finale ne sera faite qu'après l'étude séparée des directions encore retenues.

## Méthode d'examen

- Examiner une proposition à la fois, point par point.
- Distinguer le principe de visualisation des détails de finition.
- Ne modifier aucun prototype pendant la phase de lecture.
- Comparer les propositions seulement après leur examen individuel.

## Décisions prises

### Atlas

**Décision : écarté.**

La proposition Atlas est retirée de la comparaison dès le premier examen. Elle ne sera pas développée dans la suite du laboratoire.

### Directions encore examinées

- Constellation
- Matrice

## Constellation

### Vue générale à l'arrivée

#### Ce qui fonctionne

- La forme générale évoque bien une constellation, même si elle peut aussi faire penser à un atome.
- Le principe se comprend rapidement : les éléments périphériques représentent les formulations et leur taille semble proportionnelle à leur nombre d'occurrences.
- L'entrée donne donc une première lecture globale du corpus sans explication longue.
- Le principe d'un centre entouré d'éléments en mouvement reste une piste intéressante pour organiser l'exploration.

#### Ce qui pose problème

- Le nombre central « 6 082 » est ambigu. On ne comprend pas immédiatement son unité, les notices auxquelles il se rapporte, ni pourquoi il occupe le centre.
- La relation entre « 8 formulations », « 6 082 occurrences » et les notices doit être explicitée. Le centre ne doit pas obliger le lecteur à connaître la différence entre une notice et une occurrence.
- Les traits autour du centre ne paraissent pas réellement relier les éléments. Cela affaiblit la lecture relationnelle de la constellation.
- La direction visuelle évoque davantage l'astronomie que les œuvres, les collections ou les musées. Le principe spatial peut être conservé, mais son traitement devra être rapproché du sujet artistique.
- L'état sélectionné est trop discret s'il repose seulement sur un point ou un marqueur.

#### Pistes à étudier

- Mieux contextualiser la vue générale avec une indication courte intégrée à l'interface, sans compter sur un texte explicatif pour rendre le schéma compréhensible.
- Repenser le contenu et la hiérarchie du centre plutôt que seulement reformuler « 6 082 occurrences ».
- Donner à la sélection un changement spatial perceptible : la formulation choisie pourrait se déplacer au premier plan tandis que l'ensemble se réorganise autour d'elle.
- Travailler les formes, les relations et les mouvements pour conserver l'idée de constellation sans adopter littéralement les codes des planètes et de l'astronomie.

Ces pistes ne constituent pas encore des choix de design. Elles seront confrontées aux autres états de la Constellation puis à la Matrice.

### Sélection d'une formulation et passage à un artiste

#### Ce qui fonctionne

- Après la sélection de « De son école », le résultat principal est compréhensible : la formulation est reliée à 58 artistes du corpus.
- Les premiers noms affichés, dont Charles Le Brun, Le Primatice, Michel-Ange et Rubens, rendent cette relation concrète.
- Le nombre de noms reliés donne une mesure utile par rapport aux 102 artistes du corpus.

#### Rupture du principe visuel

- La constellation disparaît dès la première sélection et laisse place à une relation linéaire accompagnée d'une liste. La forme change trop tôt.
- Le lecteur pouvait raisonnablement attendre un changement d'échelle conservant la même grammaire : la formulation choisie devient le nouveau centre et les artistes reliés s'organisent autour d'elle.
- Le passage à Charles Le Brun devrait d'abord ouvrir un état centré sur l'artiste lui-même : portrait, repères essentiels et relations vers les œuvres. Le prototype conduit trop directement à une œuvre particulière.
- Le clic supplémentaire sur Charles Le Brun et l'apparition d'une seule grande notice rendent le parcours difficile à comprendre. On ne sait plus clairement quel niveau est actif ni pourquoi cette notice est montrée.
- Montrer une seule notice ne permet pas de comprendre les 240 notices associées à Charles Le Brun dans cette formulation. Montrer les 240 de la même manière saturerait au contraire la vue : le prototype ne démontre donc pas encore comment ce niveau peut fonctionner sur le corpus réel.

#### Attente pour une direction Constellation cohérente

La proposition devrait tester un changement d'échelle continu plutôt qu'une succession de mises en page différentes :

1. corpus centré sur les formulations ;
2. formulation sélectionnée au centre, entourée des artistes reliés ;
3. artiste sélectionné au centre, identifié notamment par son portrait et ses repères, entouré des œuvres ou de regroupements d'œuvres ;
4. accès à une œuvre précise puis à son lieu de conservation.

Cette attente ne signifie pas que les 58 artistes ou les 240 notices doivent tous être affichés simultanément et avec le même poids. Leur regroupement, leur dévoilement progressif et la manière de conserver le contexte restent à concevoir.

### Version mobile

**Verdict sur le prototype actuel : rejeté.**

- La composition desktop a été adaptée à un écran vertical sans être véritablement repensée pour celui-ci.
- La vue générale devient trop dispersée, les relations sont difficiles à percevoir et les libellés perdent leur lisibilité.
- Après sélection, la représentation se transforme en mise en page verticale et ne conserve plus le principe spatial annoncé par la Constellation.
- L'enchaînement entre formulation, artiste et notice ne produit donc pas une exploration mobile cohérente.

Ce résultat ne suffit pas encore à écarter le principe de la Constellation. Il montre cependant qu'une simple adaptation responsive ne fonctionnera pas. Si cette direction est retenue, elle exigera une composition mobile propre, conçue pour l'écran vertical et le toucher, tout en conservant la même logique de changement d'échelle que sur ordinateur.

### Bilan provisoire de la Constellation

- **Promesse forte :** une grammaire spatiale continue dans laquelle l'élément choisi devient le centre de l'étape suivante.
- **Compréhension initiale :** bonne dans son principe, sous réserve de clarifier le centre et les unités comptées.
- **Prototype actuel :** il ne matérialise cette promesse que dans sa première vue, puis la remplace par des listes et une notice isolée.
- **Risque principal :** saturation lors du passage à des dizaines d'artistes ou des centaines de notices.
- **Condition de poursuite :** prototyper réellement le changement d'échelle imbriqué et concevoir séparément son fonctionnement mobile.

## Matrice

### Vue générale à l'arrivée

#### Ce qui fonctionne

- La structure se comprend rapidement : chaque formulation occupe une ligne et trois mesures lui sont associées.
- Les dimensions « occurrences », « artistes liés » et « musées présents » donnent immédiatement une lecture plus statistique du corpus.
- L'organisation rigide rend les formulations comparables et laisse une place éditoriale utile dans la colonne de gauche pour contextualiser la visualisation.
- L'indication « Déplier la ligne » suggère correctement qu'une ligne peut ouvrir un niveau d'exploration supplémentaire, même si ce signal devrait être rendu plus perceptible.

#### Ce qui pose problème

- Le nombre d'occurrences est affiché deux fois sur chaque ligne : une première fois près du nom de la formulation, puis dans l'aplat de la première mesure. Cette répétition introduit une confusion et n'existe pas dans les deux autres colonnes.
- L'en-tête « Formulation / occurrences » rassemble deux informations différentes et paraît décalé par rapport à la colonne qu'il est censé expliquer.
- La première colonne est donc visuellement compréhensible mais difficile à lire précisément lorsqu'on cherche ce que chaque nombre représente.
- Les trois colonnes utilisent des unités différentes. Leur échelle et la règle de proportion des aplats devront être suffisamment explicites pour éviter qu'on compare directement un nombre de notices, un nombre d'artistes et un nombre de musées.
- Un lecteur qui ne connaît pas déjà le projet ne comprendra pas nécessairement seul toutes les conventions de la matrice.

#### Besoin éditorial

La Matrice demande à la fois une contextualisation et une légende de lecture concise. La colonne de gauche offre la place nécessaire, mais son texte devra expliquer concrètement :

- ce que représente une ligne ;
- ce que mesurent les trois colonnes ;
- comment lire la taille des aplats ;
- ce qui se passe lorsqu'une ligne est ouverte.

À l'inverse, la Constellation demandait surtout une contextualisation : son principe spatial initial se comprenait sans véritable mode d'emploi.

#### Caractère de la proposition

La Matrice est plus rigide et plus statistique que la Constellation. Ce caractère peut être une force de lecture ou une limite créative ; il devra être évalué après l'examen de son déploiement, de ses transitions et de sa version mobile.

### Ouverture de la formulation « École de »

#### Ce qui fonctionne

- Le second niveau reste plus cohérent avec la vue générale que dans la proposition Constellation : ouvrir une ligne conduit à une comparaison des artistes associés à cette formulation.
- Le contexte principal demeure visible : « École de », 1 343 occurrences, 58 artistes et 39 musées.
- La liste latérale conserve les autres formulations et indique clairement celle qui est ouverte.
- Les hauteurs permettent d'identifier Charles Le Brun comme le nom le plus représenté, devant Le Primatice, Michel-Ange et Rubens.
- Malgré son austérité actuelle, la logique de ce palier est plus solide et moins déroutante que celle du second niveau de la Constellation.

#### Ce qui pose problème

- La vue ne montre que dix artistes sur les 58 annoncés, sans commande évidente pour atteindre les autres. Un mécanisme de parcours explicite est indispensable.
- Le panneau sombre « La trame révèle » est un commentaire éditorial affiché avant toute sélection d'artiste. Il recouvre une partie des barres et masque notamment les artistes placés à droite.
- Ce commentaire répète une information déjà lisible dans le graphique : Charles Le Brun possède 240 notices et précède Le Primatice et Michel-Ange. Il ajoute en outre une indication technique sur la largeur constante des artistes minoritaires, qui relève de la légende de lecture plutôt que d'un enseignement éditorial.
- Sa fonction n'est pas perceptible lors de la première consultation : il peut être pris à tort pour le détail de Charles Le Brun sélectionné.
- Ce panneau constitue le principal échec de ce palier : il n'apporte pas d'information décisive et empêche de consulter celles qui sont déjà présentes.
- La sélection de Charles Le Brun est trop peu incarnée. La seule différence graphique de sa barre ne suffit pas à faire comprendre qu'un artiste précis est actif.
- La présence d'un portrait ou d'un repère visuel propre à l'artiste permettrait d'identifier immédiatement la sélection et de rapprocher la visualisation de son sujet artistique.

#### Exigences pour la suite

- Prévoir un parcours clair des 58 artistes : pagination, déplacement horizontal ou autre mécanisme visible à concevoir.
- Supprimer ce commentaire redondant de la zone des données. Un éventuel enseignement éditorial ne sera conservé que s'il apporte une information que la visualisation ne montre pas déjà.
- Réserver, si elle est utile, une zone distincte au détail de l'artiste réellement sélectionné, sans superposition avec les barres. Son emplacement reste à déterminer.
- Distinguer sans ambiguïté un commentaire éditorial de l'état interactif produit par une sélection.
- Conserver la possibilité de choisir n'importe quel autre artiste sans que le détail courant en masque l'accès.

Le passage de Charles Le Brun à une œuvre précise reste à examiner séparément.

### Sélection de Charles Le Brun et passage aux œuvres

**Verdict sur ce troisième niveau : échec de compréhension.**

#### Ce qui provoque le décrochage

- Après la sélection, Charles Le Brun n'est toujours pas présenté comme un sujet à part entière : aucun portrait, aucune description ni repère essentiel ne permet de l'identifier.
- Le Primatice, Michel-Ange, Rubens et d'autres artistes restent au premier plan alors que l'interface est censée avoir changé de niveau. On ne sait pas si l'on compare encore les artistes ou si l'on explore désormais Charles Le Brun.
- Une seule œuvre, « Sainte Geneviève devant Paris », apparaît parmi les 240 notices annoncées. Rien n'explique pourquoi elle a été choisie ni comment accéder aux 239 autres.
- La grande place occupée par cette œuvre donne l'impression qu'elle représente à elle seule le nouvel état, sans fournir de système pour parcourir l'ensemble.
- Le musée de l'œuvre apparaît immédiatement, alors que l'étape artiste et l'accès à son corpus d'œuvres ne sont pas encore construits. Plusieurs niveaux documentaires sont ainsi condensés dans une même vue.

#### Ce qu'un état « artiste sélectionné » devrait résoudre

- Identifier immédiatement l'artiste, notamment par son portrait lorsqu'il existe, son nom et quelques repères utiles.
- Montrer sans ambiguïté que Charles Le Brun est devenu le sujet actif.
- Décider si les autres artistes restent comme contexte comparatif secondaire ou s'effacent au profit du nouveau niveau. Ils ne doivent pas conserver la même présence qu'avant.
- Donner accès à l'ensemble des œuvres ou notices concernées au moyen d'une organisation adaptée aux grands volumes : regroupements, filtres, parcours progressif ou autre système à concevoir.
- Ne montrer le détail complet d'une œuvre et son musée qu'après le choix explicite de cette œuvre.

#### Décision de navigation

Une fois Charles Le Brun sélectionné, les autres artistes de la comparaison ne doivent plus rester dans la vue principale. Le lecteur entre dans un niveau consacré à Charles Le Brun et à son corpus.

- Le Primatice, Michel-Ange, Rubens, Andrea del Sarto et les autres artistes s'effacent de cet état.
- Une commande de retour permet de revenir à la formulation ouverte et à la sélection parmi les 58 artistes.
- Le lecteur peut alors choisir un autre artiste et ouvrir son propre espace d'exploration.
- Le contexte antérieur est conservé par une navigation réversible et un chemin lisible, pas par l'accumulation simultanée de tous les niveaux à l'écran.

Le rôle de la colonne de gauche devra être redéfini pour accompagner ces changements de niveau. Elle pourrait participer au repérage et au retour dans le parcours, mais sa forme et son contenu seront décidés avec l'architecture de navigation complète.

#### Potentiel conservé

- Les deux premiers niveaux de la Matrice fournissent une base de réflexion plus solide que ce troisième état.
- La direction visuelle se rapproche davantage de l'univers des musées et laisse des espaces disponibles pour une narration éditoriale.
- Une exploration des œuvres inspirée de certains acquis du site éditorial pourrait être adaptée à cette nouvelle interface, sans reproduire sa structure à l'identique.
- La direction artistique, la typographie et la composition devront être retravaillées, mais elles ne sont pas la cause principale du décrochage : c'est l'absence d'une progression documentaire claire.

### Version mobile

#### Verdict

La Matrice fournit une base mobile nettement plus viable que la Constellation. Sa structure de lignes, de mesures et de barres s'adapte naturellement à un écran vertical. Elle demande des ajustements, mais pas une réinvention complète de son principe.

#### Ce qui fonctionne

- La vue générale conserve immédiatement sa structure et ses données sur un écran étroit.
- La formulation ouverte, ses effectifs et les premières barres d'artistes restent lisibles dans une composition verticale.
- La représentation utilise un vocabulaire graphique plus normé, donc plus facile à recomposer entre ordinateur et téléphone.
- La grande zone disponible sous les barres offre une place possible pour présenter l'artiste sélectionné avec son portrait, son nom, sa fonction et les informations nécessaires.
- L'image d'œuvre et son cartel composent déjà un ensemble visuellement convaincant sur téléphone.

#### Points à reprendre

- La vue générale laisse peu de place à la contextualisation éditoriale. Sa présence et sa forme sur mobile devront être conçues spécifiquement.
- Le commentaire actuel « La trame révèle » reste inutile et ne doit pas être conservé sous cette forme. Seul l'espace qu'il occupe peut inspirer la future zone consacrée à un artiste réellement sélectionné.
- L'état artiste devra appliquer la décision prise plus haut : les autres artistes disparaissent de la vue principale et un retour permet de retrouver leur comparaison.
- La présence réussie d'une vignette ne résout pas l'accès aux 240 œuvres. Le parcours, le regroupement et l'affichage de l'ensemble restent à concevoir.
- Tailles, densité, cibles tactiles et compatibilité avec plusieurs largeurs de téléphone devront encore être vérifiées.

### Bilan provisoire de la Matrice

- **Compréhension initiale :** bonne, mais elle exige une légende et une contextualisation plus précises que la Constellation.
- **Deuxième niveau :** cohérent dans son principe de comparaison des artistes, sous réserve de permettre l'accès aux 58 noms et de retirer le panneau superposé.
- **Troisième niveau :** à reconstruire pour consacrer un véritable espace à l'artiste, puis à son corpus d'œuvres.
- **Version mobile :** base déjà solide et adaptable, très supérieure à celle de la Constellation actuelle.
- **Potentiel éditorial :** la composition laisse de la place au récit et se rapproche davantage de l'univers visuel recherché pour les œuvres et les musées.

## Comparaison finale

### Direction retenue : la Matrice

La Matrice devient la base du prototype d'exploration. Ce choix porte sur son système général, pas sur l'acceptation de tous les écrans du laboratoire.

#### Raisons du choix

- Sa vue générale rend les huit formulations et les trois mesures comparables dans une structure immédiatement identifiable.
- L'ouverture d'une formulation vers les artistes prolonge plus naturellement le système initial que dans la Constellation.
- Sa composition laisse une place réelle à la contextualisation et au récit éditorial.
- Son traitement visuel peut être rapproché de l'univers des musées et des œuvres sans dépendre d'une métaphore astronomique.
- Sa structure se transpose déjà de manière convaincante sur mobile et devra être améliorée plutôt que réinventée.
- Elle paraît plus robuste pour accueillir progressivement l'ensemble du corpus.

#### Ce qui n'est pas validé dans le prototype actuel

- la répétition et le placement des nombres dans la vue générale ;
- l'explication des trois mesures et de leurs échelles ;
- le commentaire « La trame révèle » ;
- la limitation aux dix premiers artistes sans navigation ;
- le maintien des autres artistes après la sélection de Charles Le Brun ;
- l'absence d'une véritable présentation de l'artiste sélectionné ;
- l'affichage arbitraire d'une seule œuvre sans mécanisme d'accès aux autres ;
- la direction artistique et typographique définitive.

#### Apport conservé de la Constellation

La représentation orbitale n'est pas retenue. Son idée la plus féconde peut néanmoins guider le prototype : chaque sélection doit produire un changement de niveau perceptible, conserver le contexte et permettre un retour simple. Cette continuité devra être obtenue par les transitions et la navigation de la Matrice, sans ajouter une seconde métaphore visuelle.

#### Prochain prototype

Le nouveau prototype devra reconstruire le parcours suivant :

1. vue générale des formulations ;
2. ouverture d'une formulation et exploration de tous les artistes reliés ;
3. espace entièrement consacré à l'artiste sélectionné ;
4. exploration organisée de ses œuvres ;
5. sélection d'une œuvre, accès à ses mots exacts et à son lieu de conservation ;
6. retours explicites à chaque niveau.

Ce parcours devra être matérialisé sur ordinateur et téléphone avant toute extension au corpus complet.
