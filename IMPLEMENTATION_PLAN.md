# Plan d'Implémentation - Refonte Portfolio

Date : 30 décembre 2024
Statut : Planification

---

## 🎯 Objectifs Globaux

1. ✅ Simplifier l'architecture (JSON, pas Redis)
2. ✅ Ajouter le blog (MDX)
3. ✅ Ajouter page About complète
4. ✅ Documenter l'API base de connaissance
5. 🔄 Mettre à jour le contenu avec nouvelle direction éditoriale
6. ⏳ Hiérarchiser le contenu de la page principale
7. ⏳ Optimiser le SEO

---

## 📋 PHASE 1 : Mise à jour du Contenu

### 1.1 ProfileHeader (Page principale)

**Fichier** : `components/profile-header.tsx`

**Actions** :
- [ ] Remplacer le titre/tagline actuel
- [ ] Mettre à jour la description
- [ ] S'assurer que les liens (booking, YouTube) sont corrects

**Contenu proposé** :
```typescript
titre: "Jason Suarez"
tagline: "Développeur Fullstack | Créateur de Clarté"
description: "De la confusion technique à l'autonomie réelle"
```

**Alternative** :
```typescript
titre: "Jason Suarez"
tagline: "Je transforme la complexité tech en autonomie concrète"
description: "Développeur • Pédagogue • Bâtisseur"
```

**Fichiers à vérifier** :
- `components/profile-header.tsx`

---

### 1.2 Section "À propos" (Page principale)

**Fichier** : `app/page.tsx` (ligne ~202-259)

**Actions** :
- [ ] Remplacer tout le contenu de la section "À propos"
- [ ] Garder le bouton "En savoir plus → /about"
- [ ] Utiliser le nouveau texte aligné avec l'utile propre

**Nouveau contenu** : Voir `CONTENT_PROPOSAL.md` section 2

**Structure à conserver** :
```jsx
<section className="mt-16">
  <SectionHeader title="À propos" />
  <div className="bg-[#111] p-8 rounded-3xl ...">
    {/* Nouveau contenu ici */}
    <div className="flex justify-center">
      <Button asChild variant="outline" size="lg" className="rounded-full">
        <Link href="/about">En savoir plus →</Link>
      </Button>
    </div>
  </div>
</section>
```

**Fichiers à modifier** :
- `app/page.tsx`

---

### 1.3 Page About complète

**Fichier** : `app/about/page.tsx`

**Actions** :
- [ ] Remplacer tout le contenu de la page
- [ ] Utiliser la structure proposée dans `CONTENT_PROPOSAL.md` section 3
- [ ] Conserver les composants UI existants (Badge, Button, etc.)
- [ ] Maintenir le style bento

**Sections à inclure** :
1. Le parcours
2. La posture
3. La philosophie (en bref)
4. La vision
5. Valeurs opérantes
6. Ce que je ne suis pas / Ce que je suis
7. Stack & Compétences
8. Projets (SWE Wannabe, @swarecito)
9. Contact & Liens

**Fichiers à modifier** :
- `app/about/page.tsx`

---

### 1.4 Services / Ce que je peux apporter

**Localisation** : Actuellement dans `app/about/page.tsx` (services section)

**Actions** :
- [ ] Remplacer les 6 cartes de services actuelles
- [ ] Utiliser les 4 nouvelles propositions :
  1. Développement Fullstack
  2. Clarification Technique
  3. Mentorat Dev Junior/Reconversion
  4. Automatisation & Workflows
- [ ] Adapter les icônes (Code, Target, Users, Zap)

**Fichiers à modifier** :
- `app/about/page.tsx`

---

### 1.5 Métadonnées SEO

**Fichiers** :
- `app/layout.tsx` (metadata racine)
- `app/page.tsx` (metadata page principale si export)
- `app/about/page.tsx` (metadata déjà présente)
- `app/blog/page.tsx` (metadata déjà présente)
- `app/blog/[slug]/page.tsx` (dynamique)

**Actions** :
- [ ] Mettre à jour `app/layout.tsx` avec nouvelles metadata
- [ ] Ajouter keywords pertinents
- [ ] Configurer OpenGraph tags
- [ ] Configurer Twitter cards
- [ ] Vérifier tous les exports de metadata

**Contenu proposé** : Voir `CONTENT_PROPOSAL.md` section 5

**Fichiers à modifier** :
- `app/layout.tsx`

---

## 📋 PHASE 2 : Hiérarchisation de la Page Principale

### 2.1 Ordre actuel des sections

```
1. ProfileHeader
2. Mes Liens (3 LinkCards)
3. Mes Ressources (avec tabs)
4. Call To Action
5. Blog (3 derniers articles)
6. Projets / Use Cases
7. À propos
8. SiteFooter
```

### 2.2 Ordre proposé (à valider)

**Option A - Focus Contenu** :
```
1. ProfileHeader
2. Blog (featured + récents) ← Monter
3. Projets / Use Cases
4. À propos (version courte)
5. Mes Ressources
6. Mes Liens
7. Call To Action
8. SiteFooter
```

**Option B - Focus Parcours** :
```
1. ProfileHeader
2. À propos (version courte + CTA "En savoir plus")
3. Projets / Use Cases
4. Blog (featured + récents)
5. Mes Ressources
6. Mes Liens (ou intégrer dans footer)
7. Call To Action
8. SiteFooter
```

**Option C - Équilibré (recommandé)** :
```
1. ProfileHeader
2. Mes Liens (booking important)
3. À propos (version courte)
4. Projets / Use Cases ← Portfolio avant tout
5. Blog (3 derniers)
6. Mes Ressources
7. Call To Action finale
8. SiteFooter
```

**Actions** :
- [ ] Choisir l'ordre optimal
- [ ] Réorganiser les sections dans `app/page.tsx`
- [ ] Tester visuellement l'équilibre
- [ ] Vérifier les espacements (mt-16 cohérents)

**Fichiers à modifier** :
- `app/page.tsx`

---

### 2.3 Ajustements visuels éventuels

**À vérifier** :
- [ ] Taille/poids des sections (équilibre visuel)
- [ ] Section "À propos" version courte pas trop longue
- [ ] CTA bien placés (pas trop de répétitions)
- [ ] Cohérence des call-to-actions

---

## 📋 PHASE 3 : Optimisation SEO

### 3.1 SEO Technique

**Metadata globales** :
- [ ] Title tag optimisé (60 caractères max)
- [ ] Meta description (155-160 caractères)
- [ ] Keywords pertinents (sans spam)
- [ ] OpenGraph tags complets
- [ ] Twitter cards configurées
- [ ] Canonical URLs

**Fichiers concernés** :
- `app/layout.tsx`
- Toutes les pages avec export `metadata`

---

### 3.2 SEO Blog

**Articles MDX** :
- [ ] Ajouter plus de metadata dans frontmatter :
  - `excerpt` (résumé pour SEO)
  - `keywords` (mots-clés spécifiques)
  - `canonical` (si republié ailleurs)
  - `ogImage` (image OpenGraph spécifique)

**Structure type** :
```typescript
export const metadata = {
  title: "...",
  description: "...",
  publishedAt: "2025-01-01",
  updatedAt: "2025-01-15", // si mis à jour
  author: "Jason Suarez",
  tags: ["..."],
  featured: true,
  coverImage: "/images/...",

  // Nouveaux champs SEO
  excerpt: "Résumé court pour moteurs de recherche",
  keywords: ["mot1", "mot2", "mot3"],
  canonical: "https://jasonsuarez.dev/blog/slug",
  ogImage: "/images/blog/og-slug.png"
}
```

**Actions** :
- [ ] Mettre à jour les 3 articles existants
- [ ] Créer template pour nouveaux articles
- [ ] Ajouter schema.org markup (Article)

**Fichiers concernés** :
- `content/blog/*.mdx`
- `app/blog/[slug]/page.tsx` (ajouter JSON-LD)

---

### 3.3 SEO Technique Avancé

**Structured Data (JSON-LD)** :
- [ ] Schema Person (page About)
- [ ] Schema BlogPosting (articles)
- [ ] Schema BreadcrumbList (navigation)
- [ ] Schema Organization (site global)

**Exemple pour Article** :
```typescript
// Dans app/blog/[slug]/page.tsx
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: metadata.title,
  description: metadata.description,
  author: {
    '@type': 'Person',
    name: metadata.author,
  },
  datePublished: metadata.publishedAt,
  dateModified: metadata.updatedAt || metadata.publishedAt,
  image: metadata.coverImage,
}

// Dans le return JSX
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

---

### 3.4 SEO Contenu

**Blog** :
- [ ] Titres H1 uniques et descriptifs
- [ ] Structure H2-H6 cohérente
- [ ] Mots-clés naturellement intégrés
- [ ] Internal linking (articles entre eux)
- [ ] External links pertinents
- [ ] Images avec alt text descriptifs

**Pages statiques** :
- [ ] Même structure H1-H6
- [ ] Descriptions enrichies
- [ ] CTAs clairs

---

### 3.5 Performance & Core Web Vitals

**À vérifier** :
- [ ] Images optimisées (Next.js Image component)
- [ ] Lazy loading
- [ ] Fonts optimisés
- [ ] CSS/JS minifiés (Next.js le fait)
- [ ] Lighthouse score > 90

**Commandes à exécuter** :
```bash
# Tester le build de production
bun run build

# Analyser avec Lighthouse
npx lighthouse http://localhost:3000 --view

# Vérifier bundle size
npx @next/bundle-analyzer
```

---

### 3.6 Sitemap & Robots.txt

**Sitemap** :
- [x] `app/sitemap.ts` existe déjà
- [ ] Vérifier qu'il inclut toutes les pages
- [ ] Ajouter les articles de blog dynamiquement
- [ ] Vérifier les priorités et changefreq

**Robots.txt** :
- [x] `app/robot.ts` existe déjà
- [ ] Vérifier la configuration
- [ ] S'assurer que rien d'important n'est bloqué

**Fichiers à vérifier** :
- `app/sitemap.ts`
- `app/robot.ts`

---

## 📋 PHASE 4 : Contenus Blog

### 4.1 Articles existants

**Actuellement** :
- [x] welcome-to-my-blog.mdx
- [x] automatisation-n8n.mdx
- [x] agents-ia-claude.mdx

**Actions** :
- [ ] Enrichir avec metadata SEO complètes
- [ ] Ajouter des images de couverture optimisées
- [ ] Vérifier la structure H1-H6
- [ ] Ajouter internal links si pertinent

---

### 4.2 Nouveaux articles à créer

**Suggestions alignées avec votre stratégie** :

1. **"Junior à architecte : ce que l'IA ne peut pas faire pour vous"**
   - Tags : IA, Apprentissage, Carrière
   - Angle : Médiation tech/humain
   - Image : `/images/icons/grow-coin.png`

2. **"Apprendre à coder en 2025 : les erreurs à éviter"**
   - Tags : Apprentissage, Reconversion, Débutant
   - Angle : Transmission honnête
   - Image : `/images/icons/card.png`

3. **"SWE Wannabe : pourquoi un CLI pour apprendre ?"**
   - Tags : SWE Wannabe, Pédagogie, Ingénierie
   - Angle : Vision produit
   - Image : `/images/icons/flash-sale.png`

4. **"De prof à dev : ce que j'ai appris en changeant de carrière"**
   - Tags : Reconversion, Témoignage, Apprentissage
   - Angle : Parcours incarné
   - Image : `/images/icons/star-badge.png`

**Priorité** :
- Court terme : Articles 1 et 2 (plus alignés stratégie @swarecito)
- Moyen terme : Article 3 (promotion SWE Wannabe)
- Long terme : Article 4 (témoignage personnel)

---

## 📋 PHASE 5 : Améliorations Techniques

### 5.1 Images Blog

**Actions** :
- [ ] Créer ou trouver des images de couverture pour chaque article
- [ ] Optimiser toutes les images (WebP, tailles adaptatives)
- [ ] Ajouter alt text descriptifs partout
- [ ] Utiliser Next.js Image component systématiquement

**Localisation** :
- Images à stocker dans `public/images/blog/`

---

### 5.2 Composants Blog

**BlogCard** :
- [x] Harmonisé avec ResourceCard
- [x] Utilise des images (pas icônes)
- [ ] Peut-être ajouter un badge "Nouveau" pour articles récents (<7j)

**Page Blog listing** :
- [x] Style cohérent
- [ ] Peut-être ajouter un filtre par tag (futur)
- [ ] Pagination si > 10 articles (futur)

**Page Article** :
- [x] Style cohérent
- [ ] Ajouter "Temps de lecture estimé" (futur)
- [ ] Ajouter "Articles similaires" (futur)
- [ ] Ajouter boutons de partage social (futur)

---

### 5.3 Analytics & Tracking

**À configurer (optionnel)** :
- [ ] Google Analytics ou Plausible
- [ ] Tracking événements (clics CTA, lectures articles)
- [ ] Heatmaps (Hotjar, Microsoft Clarity)

**Note** : Vérifier RGPD/consentement si analytics

---

## 📋 PHASE 6 : Tests & Validation

### 6.1 Tests de contenu

**À vérifier manuellement** :
- [ ] Tous les textes sont corrects (typos, grammaire)
- [ ] Tous les liens fonctionnent
- [ ] Les images s'affichent correctement
- [ ] Responsive design OK (mobile, tablet, desktop)
- [ ] Dark mode cohérent

---

### 6.2 Tests SEO

**Outils à utiliser** :
```bash
# Google PageSpeed Insights
https://pagespeed.web.dev/

# Google Search Console
https://search.google.com/search-console

# Lighthouse CI
npx lighthouse http://localhost:3000

# SEO meta inspector
https://metatags.io/
```

**Checklist SEO** :
- [ ] Title tags uniques partout
- [ ] Meta descriptions partout
- [ ] OpenGraph images présentes
- [ ] Sitemap accessible (/sitemap.xml)
- [ ] Robots.txt accessible (/robots.txt)
- [ ] Pas d'erreurs console navigateur
- [ ] Pas de liens cassés

---

### 6.3 Tests Performance

**Métriques cibles** :
- LCP (Largest Contentful Paint) : < 2.5s
- FID (First Input Delay) : < 100ms
- CLS (Cumulative Layout Shift) : < 0.1
- Lighthouse Performance : > 90

**Actions** :
- [ ] Tester sur localhost
- [ ] Tester en production (après deploy)
- [ ] Tester sur mobile 3G (throttling)

---

## 📋 PHASE 7 : Déploiement

### 7.1 Pre-déploiement

**Checklist** :
- [ ] Toutes les modifications testées localement
- [ ] Build production sans erreurs (`bun run build`)
- [ ] Pas d'erreurs TypeScript
- [ ] Pas d'erreurs ESLint critiques
- [ ] `.env` variables configurées (si nécessaire)

---

### 7.2 Déploiement Vercel

**Actions** :
- [ ] Push vers GitHub main branch
- [ ] Vérifier auto-deploy Vercel
- [ ] Tester le site en production
- [ ] Vérifier les analytics Vercel

**Post-déploiement** :
- [ ] Soumettre sitemap à Google Search Console
- [ ] Vérifier indexation Google (site:jasonsuarez.dev)
- [ ] Tester tous les liens en production
- [ ] Vérifier les Core Web Vitals en production

---

## 📊 Récapitulatif par Priorité

### 🔥 Priorité HAUTE (cette semaine)

1. **Contenu** :
   - [ ] Mettre à jour ProfileHeader
   - [ ] Mettre à jour section "À propos" page principale
   - [ ] Réécrire page /about complète
   - [ ] Mettre à jour services/compétences

2. **SEO de base** :
   - [ ] Metadata globales (layout.tsx)
   - [ ] Metadata blog enrichies

3. **Hiérarchisation** :
   - [ ] Choisir l'ordre des sections
   - [ ] Réorganiser app/page.tsx

### 🟡 Priorité MOYENNE (prochaine semaine)

4. **SEO avancé** :
   - [ ] JSON-LD structured data
   - [ ] Sitemap vérifié avec blog
   - [ ] Internal linking

5. **Contenu Blog** :
   - [ ] 1-2 nouveaux articles
   - [ ] Images de couverture optimisées

### 🟢 Priorité BASSE (quand temps dispo)

6. **Améliorations UX** :
   - [ ] Temps de lecture
   - [ ] Articles similaires
   - [ ] Filtres par tag

7. **Analytics** :
   - [ ] Configuration tracking
   - [ ] Monitoring performance

---

## 📁 Fichiers à Modifier (Résumé)

### Contenu
- `components/profile-header.tsx`
- `app/page.tsx`
- `app/about/page.tsx`
- `app/layout.tsx`

### Blog
- `content/blog/*.mdx` (enrichir metadata)
- `app/blog/[slug]/page.tsx` (ajouter JSON-LD)

### SEO
- `app/sitemap.ts` (vérifier)
- `app/robot.ts` (vérifier)

### Nouveaux fichiers
- `content/blog/[nouveaux-articles].mdx`

---

## ✅ Checklist Finale avant Go-Live

- [ ] Tout le contenu mis à jour
- [ ] SEO optimisé (metadata, sitemap, structured data)
- [ ] Performance > 90 (Lighthouse)
- [ ] Responsive testé (mobile, tablet, desktop)
- [ ] Tous les liens fonctionnent
- [ ] Pas d'erreurs console
- [ ] Build production OK
- [ ] Déployé sur Vercel
- [ ] Google Search Console configuré

---

## 📝 Notes

**Temps estimé** :
- Phase 1 (Contenu) : 2-3h
- Phase 2 (Hiérarchisation) : 30min-1h
- Phase 3 (SEO) : 2-3h
- Phase 4 (Blog) : Variable (par article : 1-2h)
- Phase 5 (Améliorations) : 1-2h
- Phase 6 (Tests) : 1h
- Phase 7 (Deploy) : 30min

**Total estimé : 8-12h de travail**

**Prochaine session** :
Commencer par Phase 1 - Mise à jour du contenu (priorité haute)
