# Sauve-le-koala : brick breaker en TypeScript

Sauve le koala est un jeu de casse brique 2D que j'ai créé en **TypeScript** dans l'élément HTML5 Canvas.
Back-end réalisé en **Java EE** sur serveur Tomcat.


![Capture d'écran du jeu](https://webcomet.fr/sauve-le-koala/capture_jeu_horizontale.png)



## Objectifs de ce projet

L'objectif principal de ce projet a été de m'améliorer en : 
* Programmation Orienté Objet
* **TypeScript**
* **Java EE**
* Base de données (**MySQL**)

**Vous trouverez les codes TypeScript principaux du jeu (fichiers *"levelX.ts"*) dans le répertoire *"/web/Game/ts/"*.**



## Développement

J'ai créé le jeu dans une approche Orientée Objet. J'ai créé un système de sessions, et d'inscription / connexion pour sauvegarder la progression des joueurs. J'ai déployé une base de données MySQL pour stocker les données des joueurs, avec hashage des mots de passe.

J'ai aussi développé le front-end du site web du jeu en HTML5, CSS3, JavaScript, et ce de manière responsive pour que le design s'adapte aux ordinateurs, tablettes et téléphones.



## Améliorations

Le code du jeu est largement perfectible, notamment en mettant en place une approche modulaire des fichiers TypeScript, avec des exports et imports de classes pour une meilleure lisibilité du fichier principal.

De plus les classes des fichiers TypeScript principaux ont un fort couplage, ce qui rend toute modification et ajout de fonctionnalité assez complexe.

J'ai cependant préféré commencer de nouveaux projets sur de bonnes bases plutôt que de modifier celui-ci.

Ce projet a tout de même été très formateur pour moi.

--------------------------------

![Capture d'écran du jeu](https://webcomet.fr/sauve-le-koala/capture_jeu.png)
