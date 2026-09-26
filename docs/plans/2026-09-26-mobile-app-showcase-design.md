# Vitrine des applications mobiles

Statut : direction approuvée le 26 septembre 2026.

## Contexte

Le portfolio présente déjà les trois applications mobiles sur la page « À propos », mais sous forme de cartes textuelles avec une icône générique. Bandaa est la seule à avoir des liens de téléchargement dans cette section. Les captures des applications ne sont pas intégrées au portfolio.

La route historique /projects/[slug] est reliée aux études de cas d’automatisation stockées dans public/data/projects.json. Elle ne représente pas les applications mobiles et ne sera pas détournée pour cet usage.

Les fichiers visuels existent dans les dépôts sources de Levels/Presi, Panoptik/Bandaa et EditIA/Be Viral AI. Leur classement et leur fraîcheur ne sont pas uniformes. Chaque asset doit être vérifié contre le bon produit et la bonne version avant sa copie dans le site. Des fichiers visuellement incorrects ou obsolètes ont déjà été repérés dans ces dossiers ; aucun export ne sera repris en masse.

## Objectif

Créer une vitrine de produits qui montre ce que chaque application permet, comment son interface répond au besoin, et quelle part Jason a prise dans sa conception et sa livraison.

## Expérience proposée

- Une page d’ensemble /apps, accessible depuis l’accueil et la page À propos, présente les trois applications avec leur icône réelle, une phrase produit, leur statut et un lien vers leur fiche.
- Une page de détail par application présente le problème utilisateur, la réponse produit, les décisions ou parcours significatifs, une sélection de captures réelles et les liens vers les stores disponibles.
- Les pages suivent les locales existantes : français sans préfixe, anglais sous /en et espagnol sous /es.
- Les pages restent dans l’identité visuelle actuelle du portfolio et s’adaptent au thème clair/sombre et aux écrans mobiles.
- Les captures sont montrées dans une galerie responsive avec légendes et textes alternatifs localisés. Une vidéo ne sera ajoutée que si elle est pertinente, finalisée et disponible comme démo produit ; pas de lecture automatique.

## Architecture et contenu

- Créer un catalogue typé, séparé de public/data/projects.json et des anciens services de gestion de projets.
- Le catalogue contient les contenus FR/EN/ES, icône, statut, dates vérifiées, textes de captures, stack partagée et liens store par application.
- Réutiliser les composants et conventions de profil, de navigation, de thème et de métadonnées déjà présents.
- Ajouter les routes localisées dans le middleware, les alternatives canoniques/hreflang et le sitemap.
- Garder les textes courts et centrés sur le problème, le produit et les responsabilités de Jason ; ne pas inventer de métriques.

## Statut et liens initiaux

- Bandaa : publiée ; conserver les liens existants App Store et Google Play.
- Be Viral AI : publiée ; ajouter la fiche française officielle App Store https://apps.apple.com/fr/app/be-viral-ai-analyse-contenu/id6746679101. Ne pas afficher de lien Google Play tant qu’une fiche officielle n’est pas confirmée.
- Presi : lancement annoncé pour début octobre 2026 ; afficher « bientôt disponible » et ne pas fabriquer de lien store avant publication.
- La stack commune React Native, Expo, TypeScript et Convex est expliquée une fois sur la page d’ensemble, sauf si une différence propre à une app est confirmée.

## Critères d’acceptation

- /apps et les trois fiches fonctionnent en français, anglais et espagnol.
- Les cartes et fiches utilisent les icônes et captures appartenant à la bonne application ; aucune image placeholder ou capture non vérifiée n’est publiée.
- Les boutons store sont présents uniquement pour les plateformes réellement disponibles et pointent vers leurs fiches officielles.
- L’accueil et la page À propos donnent accès à la vitrine sans dupliquer tout le récit produit.
- Les pages ont des titres, descriptions, URL canoniques et hreflang cohérents.
- La mise en page reste lisible sur mobile et desktop, dans les deux thèmes.
