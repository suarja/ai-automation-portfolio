# Validation humaine

Statut : **accepted** — retour utilisateur exact : « c'est parfait ».

## Proposition préparée

- En-tête commun issu du SiteHeader existant : nom du site à gauche, boutons FR et thème en haut à droite, séparateur discret.
- Lien de retour conservé sous l’en-tête, comme navigation secondaire.
- Bouton « Copier » toujours visible sur mobile ; défilement horizontal réservé au bloc de code.
- Pour les détails actuellement non traduits, EN/ES conduirait à la page d’accueil localisée correspondante au lieu d’une route inexistante.

## Implémentation autorisée

Les détails d’articles et de ressources reprennent le SiteHeader compact. Les choix EN/ES depuis ces pages non traduites renvoient à la page d’accueil localisée. Le bouton « Copier » reste visible sur écran tactile et le code conserve un défilement horizontal interne.

## Vérification

### Contrôle local — 27 septembre 2026

- Les pages `/blog/agents-ia-claude` et `/resources/prompts-claude-dev` ont été inspectées dans le navigateur local, en bureau et à 390 × 844.
- L’en-tête reste lisible sur mobile, avec le nom à gauche et les boutons langue et thème à droite. Le menu propose FR, EN et ES ; depuis une page de détail non traduite, EN et ES pointent vers `/en` et `/es`. Le passage vers `/es` a été vérifié jusqu’à la page d’accueil localisée.
- La page ressource ne déborde pas horizontalement à 390 px. Le premier bloc de code garde son défilement interne (`scrollWidth` 361 px, zone visible 290 px) et son bouton « Copier » reste visible sur écran tactile.
- Le thème clair et le thème sombre ont été contrôlés sur la page ressource. Les contrastes calculés des commandes et liens observés sont tous supérieurs à 5,9:1.
- `npm run lint:theme` : **PASS**.
- `npx tsc --noEmit` : **FAIL sur des erreurs existantes** dans les modules MCP, Redis et migration, ainsi que sur `node.props` dans `components/code-block.tsx` (ligne inchangée par cette modification).
- Les captures ont été inspectées dans le navigateur, mais aucun fichier PNG n’a été enregistré dans le dossier.
