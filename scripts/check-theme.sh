#!/usr/bin/env bash
# Échoue si un composant utilise une couleur en dur au lieu des tokens du thème.
set -euo pipefail
cd "$(dirname "$0")/.."
pattern='(bg|text|border|from|to|via)-\[#[0-9a-fA-F]{3,8}\]|(text|bg|border|from|to|via)-gray-[0-9]+|(text|bg)-purple-[0-9]+|(from|to)-white'
if grep -rnE "$pattern" app components mdx-components.tsx --include='*.tsx' | grep -v 'components/ui/' ; then
  echo "Couleurs en dur trouvées : utiliser les tokens de styles/theme.css" >&2
  exit 1
fi
echo "Thème : aucune couleur en dur hors components/ui"
