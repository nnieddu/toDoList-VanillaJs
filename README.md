### 1. Les variables existent en Javascript mais n’existent ni en HTML ni en CSS. Vrai ou Faux ?

### Faux

En HTML le tag <var> existe, mais ne sert qu'à représenter une variable dans une expression mathématique ou un texte lié à la programmation, il ne sert pas à stocker de données.

En CSS :  
A l'interieur d'un bloc :  
```
--nom-de-la-variable : valeur;
```

ou pour déclarer une ou plusieurs variables globales :

```
root {
  --nom-de-la-variable : valeur;
}
```

--------------------------------------------------------------

### 2. Quelle est la différence entre ces différentes méthodes de stockage : a. Cookie  b. SessionStorage c. LocalStorage

a. Les Cookies sont des petits fichiers de données, ils peuvent être accédés et modifiés par le serveur web, ainsi que par le navigateur de l'utilisateur. Il peut y avoir plusieurs fichier de Cookies.

b. Le SessionStorage est un mécanisme de stockage de données similaire aux Cookies, mais elle est limitée à une session de navigation spécifique.
Les données stockées dans le SessionStorage ne sont pas envoyées au serveur et sont uniquement disponibles pour le navigateur de l'utilisateur, 'en local' et ces données sont supprimées lorsque l'utilisateur ferme le navigateur ou lorsque la session expire.

c. Le LocalStorage est similaire au SessionStorage, mais les données stockées dans le LocalStorage ne sont pas supprimées lorsque l'utilisateur ferme le navigateur ou lorsque la session expire.

Enfin, la différence est également la taille maximale disponible pour chacun de ces mécanismes de stockage. Elle varie en fonction du navigateur et de la plateforme utilisée mais le LocalStorage et le SessionStorage permettent une plus grande capacité de stockage que les Cookies.

--------------------------------------------------------------

### 3. Quelles sont les règles CSS qui doivent être ajoutées pour appliquer un ellipsis sur un texte (réduire dynamiquement la longueur d’un texte afin qu’il ne dépasse pas son container et sans qu’il n’aille à la ligne) ?

```
white-space: nowrap;  
overflow: hidden;  
text-overflow: ellipsis;
```

--------------------------------------------------------------

### 4. Vous êtes face à une liste de 1000 éléments (``<li></li>``) pour lesquels chacun de ces éléments déclenche au clic une alerte avec le texte du contenu. Comment et pourquoi optimisez-vous l’écoute d'événement dans ce cas ?

Dans ce cas, j’attache un seul gestionnaire d'événements à un élément parent et utilise la propriété "target" de l'événement pour déterminer quel élément a déclenché l'événement.

--------------------------------------------------------------

### 5. Quelles sont les différences entre les types de variable suivants : var, let et const ?

La différence est leur portée et la possibilité ou non de les réaffecter / redéclarer.

var : Elle peut être réaffectée et redéclarée à tout moment. Sa portée est le contexte d'exécution courant, c'est-à-dire la fonction qui contient la déclaration ou le contexte global si la variable est déclarée en dehors de toute fonction.

let : Elle peut être réaffectée, mais ne peut pas être redéclarée dans la même portée. Sa portée est limitée à celle du bloc dans lequel elle est déclarées.

const : Variable constante, elle ne peut pas être réaffectée ni redéclarée dans la même portée.  Sa portée est limitée à celle du bloc dans lequel elle est déclarées.

--------------------------------------------------------------

### 6. Quels sont les différents avantages à l’utilisation des outils de développement “Performances” et “Mémoire” dans les navigateurs Firefox et Chromium ?

Ils permettent de détecter les fuites de mémoire et de trouver des opportunités d'optimisation en visualisant rapidement les aspects du code qui ont le plus d'impact sur les performances.

--------------------------------------------------------------

### 7. Quelle a été votre tâche la plus ardue face à laquelle vous vous êtes confronté au cours de votre expérience professionnelle ?

La résolution d'un problème de déconnexion de socket (avec Socket.IO) dans mon projet final d'étude. Le projet consistait à mettre en place une SPA de jeu de Pong multijoueur avec un chat en temps réel.
La déconnexion se produisait sur Safari mais pas sur Chrome ou Mozilla. J'ai utilisé les outils de développement et des 'console.log()' pour identifier le problème et résoudre les différences de compatibilité entre les navigateurs en ce qui concerne la gestion des WebSockets.

--------------------------------------------------------------

### 8. Quelle est la dernière chose que vous avez apprise récemment ?

Web : le SEO et l'Open Graph.
Hors web : Bases d'OpenCV et entrainement d'intelligence artificielle pour la reconnaissance d'objet ou personne sur une image ou une vidéo.

--------------------------------------------------------------

### 9. Cette année, quelle techno aimeriez-vous apprendre et utiliser ?  
  
Approfondir mes connaissances de NodeJS et du backend en général ou Angular pour la partie frontend.
