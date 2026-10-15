# Intégration d'Omni au portfolio

État du 15 octobre 2026, prêt à présenter au propriétaire pour validation du rendu.
La publication reste à approuver. Aucun push, merge, déploiement ou changement du dépôt public n'a été effectué.

## Périmètre accepté

Cette extension reprend la proposition isolée validée dans
`/Users/mata/Downloads/CV 26k/applications/ovhcloud-frontend-data-ai/omni-showcase`.
Les paragraphes de l'article et les trois PNG sont conservés, avec empreintes vérifiées.
Le projet CV reste exclu de cette présentation.

L'intégration utilise le `SiteHeader`, le thème et la police Inter du site actuel.
Les références restent `styles/theme.css`, `components/site-header.tsx` et
`components/apps/app-detail.tsx`. Aucun `DESIGN.md` ou `PRODUCT.md` n'existait.
Cette extension n'introduit pas de nouvelle identité visuelle et ne modifie pas ces références.

## Sources et parcours

- `/projects/omni-desktop` : `app/projects/omni-desktop/page.tsx` et `components/omni/omni-project.tsx`.
- `/blog/omni-interface-skills` : `content/blog/omni-interface-skills.mdx` et `components/omni/editorial-blog-post.tsx`.
- Captures et styles communs : `components/omni/`, `lib/omni.ts`, `public/images/omni/`.
- Carte française de l'accueil : `lib/candidate-content.ts`, affichée par le `WorkCard` existant.
- Article découvert par `lib/blog.ts`, rendu par `app/blog/[slug]/page.tsx`.
- Projet ajouté à `app/sitemap.ts`, article inclus par la découverte des contenus du blog.

## Relancer l'aperçu local

Le checkout isolé est `/private/tmp/omni-portfolio-integration`, branche
`codex/omni-portfolio`, créé depuis `origin/main` au commit `e9cbf55`.
L'aperçu utilise le build de production sur [localhost:8770](http://127.0.0.1:8770).

```sh
cd /private/tmp/omni-portfolio-integration
export REDIS_KV_REST_API_URL=https://127.0.0.1:1
export REDIS_KV_REST_API_TOKEN=local-preview-unused
export REDIS_KV_REST_API_READ_ONLY_TOKEN=local-preview-unused
npm run build
npm run start -- --hostname 127.0.0.1 --port 8770
```

Ces valeurs factices satisfont l'initialisation Redis héritée d'une route legacy.
Sans elles, le build échoue à cette initialisation. Aucun accès Redis réel ni identifiant
de production n'a servi. Le build a nécessité l'accès réseau autorisé pour charger Inter
depuis Google, après un premier échec de chargement dans le bac à sable.

## Vérifications et limites

Le build a réussi. La comparaison TypeScript avec la base conserve les mêmes 24 erreurs
héritées, avec zéro nouvelle erreur. Détail dans `typecheck.json`.

Les quatre routes accueil, projet, article et blog ont répondu HTTP 200. Les parcours
accueil → projet → article → projet et article → blog → article ont été exercés.
Les contrôles navigateur couvrent les images, les thèmes clair/sombre, le clavier,
les liens d'agrandissement, les titres et les métadonnées. Aucun débordement horizontal
observé à 1440 et 390 px. Voir `review/browser-checks.json` et les JPEG de `review/`.
Les fichiers `*-first.jpg` conservent les premières vues ; les autres montrent la revue finale.

La revue finale indépendante autorise la présentation au propriétaire, sans problème
matériel relevé. Elle ne vaut pas accord de publication. Les erreurs Chrome observées
venaient de l'extension `daily-companion-app`, sans erreur attribuée au site.
La revue reste manuelle : détecteur Impeccable indisponible, Safari, lecteur d'écran et
validation complète en production non exécutés. Le rendu final attend la réception du propriétaire.
