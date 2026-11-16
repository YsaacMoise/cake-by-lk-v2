# Cake by LK, version 2 — DESIGN.md

Direction reprise du prototype de référence du 13/11/2026 (dossier cake-by-nina-prototype), appliquée aux gâteaux
et aux faits de LK. Ce fichier est le contrat de design de la v2 : toute modification le suit, ou le met à jour
avec l'accord de YKM.

## Intention

Un site calme, aéré, haut de gamme. Une seule chose bouge à la fois, lentement. Le gâteau est le seul héros.
Ce qui fait l'unité : une signature et un même traitement de couleur pour toutes les photos.

## Palette

| Jeton | Valeur | Usage |
|---|---|---|
| ivoire | #F6F1EA | fond |
| pierre | #ECE4DA | fonds secondaires, cadre de l'atelier, cases vides |
| encre | #1A1714 | texte, boutons, fin de page |
| gris chaud | #6B625A | étiquettes en petites capitales |
| texte secondaire | #4A433D | phrases d'accompagnement, notes |
| trait | #D6CCC0 | filets, contours des pastilles |
| rose poudré | #E7A9B6 | moins de 5 % de la page : point du logo, point des choix sélectionnés |

## Typographie

Jost hébergée sur le site (polices/, 300, 400, 500, sous-ensemble latin, œ compris). Titres en 300, très grands,
lettres resserrées (-0,04 à -0,055 em). Interface en 400. Étiquettes en petites capitales espacées (2,4 px).
Typographie française : espace fine insécable avant ? et !, insécable avant : et dans les guillemets.

## Mouvement

- Ouverture : « Gâteaux » puis « sur mesure » apparaissent en deux temps, puis le gâteau se pose entre les deux lignes. Une seule fois.
- Défilement de l'accueil : le gâteau glisse sur le côté (vers le haut sur téléphone), le bloc « Vous choisissez. Je le réalise. » arrive.
- Ailleurs : fondus discrets à l'apparition des sections. Composeur : changement de photo et de prix.
- Interdits : éléments qui tournent, rebondissent, suivent la souris, bandes qui défilent, compteurs.
- Mouvement réduit : tout est coupé, l'accueil devient statique.

## Les photos (règle principale)

1. Toutes les photos reçoivent le même traitement : plus chaud, plus doux, saturation réduite, noirs relevés,
   hautes lumières adoucies (script .gout/style_nina.py, fonction etalonner).
2. Cadrage serré au format 4:5 : le gâteau remplit l'image (masque du gâteau, marge d'environ 7 %).
3. Gâteaux à thème : leur fond gris (granit, mur) devient un fond crème flou ; le gâteau n'est pas modifié
   (masque fin par matting). Pas de faux mur ni de faux décor : le montage sur décor inventé a été refusé en V1.
4. Aucune photo hors signature en vitrine. Une photo qui « fait fausse » à côté des autres se retire.
5. Accueil : gâteau détouré (wedding cake S&B), ombre de contact douce sous le socle, socle gardé
   (essai sans socle refusé : roses posées dessus coupées). La photo de l'accueil n'est pas répétée dans la galerie.
6. Sources : photos validées par LK (Gemini lot 4, 07, 04, tahara, photos Instagram des gâteaux à thème).
   Les versions traitées en grand format sont dans 16_Photos_style_V2 sur le bureau.

## Structure de la page

1. Accueil plein écran : « Gâteaux / sur mesure », le gâteau entre les deux lignes, phrase d'accueil, « Dès 30 € · Le Havre et alentours · À retirer ».
2. Pour quelle occasion ? Quatre cartes 4:5 avec prix de départ : Layer cake (anniversaire), Number cake (le 50), Wedding cake (agrumes), À thème (licorne, rose poudré). Un clic remplit le composeur.
3. Mes gâteaux : filtres Tous, Anniversaires et fêtes, À thème, Mariages ; toujours un grand puis quatre petits ; « Voir les N autres gâteaux » ; carte de devis à la 4e petite place des mariages.
4. Les 4 réponses avant de commander : 4 à 5 j, 30 €, 5 saveurs, Retrait, puis la note sur le prix exact.
5. Composez votre gâteau : atelier collant (photo, étiquette, « À partir de »), sept étapes, récapitulatif « Votre demande », message copié pour Instagram avec numéro LK-.
6. Fin sombre : « Racontez-moi votre fête. », retours de clientes en un seul bloc, lien vers Instagram.

## Composeur (règles reprises de la V1)

- Fêtes : Anniversaire, Mariage, Baby shower ou gender reveal, Henné, Tahara, Autre fête.
- Anniversaire : layer cake ou number cake ; Mariage : wedding cake seulement ; autres fêtes : layer cake.
- Un modèle choisi remplit la fête, le gâteau, le chiffre (number cake) et le thème (gâteau à thème).
- Le thème suit le modèle ; un thème écrit à la main reste. Un gâteau à thème reste modèle pour toute fête sauf le mariage ; un autre modèle part si la fête ou le gâteau change.
- Après un choix, la page va à la première question sans réponse, focus compris. Les erreurs s'effacent dès que la cliente agit.
- Téléphone : barre avec le prix et « Préparer mon message », cachée pendant une saisie et une fois le message prêt.
- Rien n'est envoyé : le message est copié, la cliente le colle dans Instagram (ig.me/m/cakeby_lk).

## Textes

Cake by LK parle à la première personne et vouvoie. Jamais « ses » ni « elle ». Phrases de comptoir, sans cliché
du métier. Un nom propre par gâteau (Clin d'œil, Le 18 gourmand, L'étage suspendu…). Tous les textes visibles
sont relus ensemble à chaque modification. Faits : .gout/faits.json uniquement.

## Contrôle

Portier gout-maison (.gout), parcours Playwright (modèles, thèmes, number, mariage, rechargement, téléphone),
captures 1440, 768 et 390 px, comparaison avec le prototype de référence aux mêmes positions de défilement.
