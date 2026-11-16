# Cake by LK, version 2 — DESIGN.md

Direction reprise du prototype de référence Cake by Nina (13/11/2026), appliquée aux gâteaux et aux faits de LK.
Ce fichier est le contrat de design de la v2. Toute modification le suit, ou le met à jour avec l'accord de YKM.
Dernière mise à jour : 16/11/2026, soir.

## Intention

Un site calme, aéré, haut de gamme. Une seule chose bouge à la fois, lentement. Le gâteau est le seul héros.
Objectif : qu'une visiteuse venue d'Instagram envoie une demande de commande sérieuse.
Repère de YKM : « aujourd'hui je commanderais plus chez Nina que chez LK, ça doit changer ».

## Marque

- Logo (choix C de YKM, 16/11) : monogramme LK de la v1, filet fin vertical, « cake by lk » en Jost 400, point rose.
  Le monogramme prend la couleur du texte (encre). Pas de doré dans l'en-tête.
- Sous le nom, sur ordinateur seulement : « Cake design au Havre » en petites capitales.
- Point rose du logo : 7 px. Ne pas changer sa taille sans demande de YKM.
- Icône d'onglet : pas encore le monogramme (proposé, non demandé).

## Palette

| Jeton | Valeur | Usage |
|---|---|---|
| ivoire | #F6F1EA | fond |
| pierre | #ECE4DA | fonds secondaires, cadre de l'atelier |
| encre | #1A1714 | texte, boutons, monogramme, fin de page |
| gris chaud | #6B625A | étiquettes en petites capitales |
| texte secondaire | #4A433D | phrases d'accompagnement, notes |
| trait | #D6CCC0 | filets, contours des pastilles, filet du logo |
| rose poudré | #E7A9B6 | moins de 5 % de la page |

Le rose poudré est un point, jamais une surface. Il apparaît à quatre endroits, toujours rond, 5 à 7 px :
point du logo ; entre le numéro et le nombre de gâteaux sur les cartes d'occasion ; pastille « Je veux celui-ci » ;
bouton de catégorie sélectionné (et choix sélectionnés du composeur). Ajouter un point ailleurs : demander d'abord.

## Typographie

Jost hébergée sur le site (polices/, 300, 400, 500, sous-ensemble latin, œ compris). Titres en 300, très grands,
lettres resserrées (-0,04 à -0,055 em). Interface en 400. Étiquettes en petites capitales espacées.
Typographie française : espace fine insécable avant ? et !, insécable avant : et dans les guillemets.
Les prix ne se coupent jamais (« dès 30 € », « dès 5 € la part » en nowrap).

## Mouvement

- Ouverture : « Gâteaux » puis « sur mesure » apparaissent, puis le gâteau se pose entre les deux lignes. Une seule fois.
- Le gâteau de l'accueil est grand : son pied passe derrière « sur mesure », comme chez Nina.
  Ordinateur : hauteur min(76vh, 780px), centre à 46 % de la hauteur. Téléphone et tablette : largeur
  min(130vw, 720px, (100svh − 390px) × 1,5), position calculée depuis le bas de l'écran.
- Défilement de l'accueil : le gâteau glisse (à droite sur ordinateur, vers le haut sur téléphone) et rétrécit
  (×0,76 ordinateur, ×0,64 téléphone) ; « Vous choisissez. Je le réalise. » arrive.
- Ailleurs : fondus discrets à l'apparition des sections. Composeur : changement de photo et de prix.
- Interdits : éléments qui tournent, rebondissent, suivent la souris, bandes qui défilent, compteurs.
- Mouvement réduit : tout est coupé, l'accueil devient statique.

## Photos (règle principale)

Principe voulu par YKM (16/11) : par catégorie, une photo phare, la plus belle, dans sa propre scène ; derrière,
les autres gâteaux de la catégorie dans un style uniforme, pour comparer les gâteaux et non les styles.

1. Fidélité : la cliente doit recevoir le gâteau qu'elle voit. Écart léger et imperceptible accepté (YKM, 16/11).
   Chaque retouche est comparée à l'original côte à côte en grand avant d'être gardée.
2. Photos phares : même grammaire pour les six. Gâteau centré sur une table en lin ivoire, salle de fête floue
   derrière, guirlandes lumineuses dorées, tons crème et rose poudré, lumière chaude. Même cadrage 4:5, même
   étalonnage (contraste ×0,97, rouge +1,2 %, bleu −2,2 %, saturation ×0,97). Pas de fond sombre ni coloré :
   le fond vert du tahara a été refusé (« ne va pas avec le reste »).
3. Vignettes : fond papier de studio uni, mur et sol de la même couleur, plateau blanc lisse (le carton découpé
   est retiré), lumière de gauche. Une couleur par catégorie : Anniversaires rose, Mariages blanc cassé,
   À thème bleu poudré, Naissance sauge, Tahara sable. Number cakes : gros plans.
4. Gâteaux à personnages sous licence (Disney…) : l'IA refuse ; ne pas contourner. Montage (gâteau d'origine posé
   en code sur un décor vide) ou retrait.
5. Une photo qui « fait fausse » à côté des autres se retire tout de suite. Un gâteau retiré d'un rôle (photo phare)
   reste dans sa catégorie avec une vignette : ne jamais faire disparaître un gâteau sans le dire.
6. Fichiers : sources dans /home/claude/da (cat_*/t_*.jpg vignettes, integ/lead_*.jpg photos phares, gen/ sorties
   Gemini), génération du site par da/integ/build.py (webp 480, 900, 1200).

## Structure de la page

1. Accueil plein écran : « Gâteaux / sur mesure », le gâteau « Or et roses rouges » (195) sur présentoir en bois,
   phrase d'accueil, « Dès 30 € · Le Havre et alentours · À retirer ».
2. Pour quelle occasion ? Six cartes, une par catégorie, chacune avec sa photo phare, son numéro, le nombre de
   gâteaux et le prix de départ. Ordre : Anniversaires, Number cakes, À thème (ce qui se commande pour un
   anniversaire), puis Mariages, Naissance, Tahara (les autres fêtes de famille). 3 colonnes sur ordinateur,
   2 sur téléphone. Un clic ouvre la galerie filtrée sur la catégorie (jamais le formulaire).
3. Mes gâteaux : filtres dans le même ordre (Tous en premier). Sur téléphone, les sept boutons tiennent sur deux
   lignes, tous visibles. Toujours un grand puis quatre petits, puis « Voir les N autres gâteaux ».
   « Tous » : les six photos phares d'abord, puis un gâteau de chaque catégorie à tour de rôle.
   Une catégorie : sa photo phare en grand d'abord. Pas de carte « sur devis » dans la galerie.
4. Les 4 réponses avant de commander : 4 à 5 j, 30 €, 5 saveurs, Retrait, puis la note sur le prix exact.
   Ordinateur : 4 colonnes. Tablette et téléphone : grille 2 × 2 avec filets, jamais une colonne unique.
5. Composez votre gâteau : atelier collant (photo, étiquette, « À partir de »), sept étapes, récapitulatif,
   message copié pour Instagram avec numéro LK-.
6. Fin sombre : « Racontez-moi votre fête. », retours de clientes en un seul bloc, lien vers Instagram.

## Galerie : 35 gâteaux

Anniversaires 8, Number cakes 3, À thème 10, Mariages 8, Naissance 4, Tahara 2.
Photos phares : Pluie de chocolat (137), Fraises et roses rouges (number 40, 051), La licorne arc-en-ciel (058),
La date couronnée (028), La future maman (055), Le costume vert et or (118).
Exclus faute de prix ou de nombre de parts : cœur, bento (à demander à LK).

## Composeur (règles reprises de la V1)

- Fêtes : Anniversaire, Mariage, Baby shower ou gender reveal, Henné, Tahara, Autre fête.
- Anniversaire : layer cake ou number cake ; Mariage : wedding cake seulement ; autres fêtes : layer cake.
- « Je veux celui-ci » sur un gâteau remplit le modèle, le gâteau, le chiffre et, pour un layer cake, le thème.
- Un modèle d'anniversaire s'adapte à la fête déjà choisie si elle accepte ce gâteau ; un modèle d'une fête précise
  (tahara, baby shower, mariage) prend sa fête.
- Après un choix, la page va à la première question sans réponse, focus compris.
- Téléphone : barre avec le prix et « Préparer mon message », cachée pendant une saisie et une fois le message prêt.
- Rien n'est envoyé : le message est copié, la cliente le colle dans Instagram (ig.me/m/cakeby_lk).

## Textes

Cake by LK parle à la première personne et vouvoie. Jamais « ses » ni « elle ». Phrases de comptoir, sans cliché.
Un nom propre par gâteau, aucun mot répété d'un nom à l'autre. Pas de phrase qui n'apporte rien (« Ma signature… »
retirée). Tous les textes visibles sont relus ensemble à chaque modification. Faits : .gout/faits.json uniquement.

## Contrôle

Portier gout-maison, parcours Playwright (clic d'une carte d'occasion → galerie filtrée ; « Je veux celui-ci » →
formulaire rempli ; filtres ; aucune erreur JavaScript), captures 1440, 768 et 390 px, comparaison avec Nina
aux mêmes positions de défilement.
