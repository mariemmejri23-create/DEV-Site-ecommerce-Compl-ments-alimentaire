# Étape 6 — Organisation du fichier Figma, maquettes HD & passage à Webflow

---

## 6.1 Structure du fichier Figma (pages)

```
📁 Neuf Lunes — Site e-commerce
 ├── 📄 00 · Cover                  (nom, version, statut, date)
 ├── 📄 01 · Brainstorming          (ou lien vers le FigJam : étapes 1 à 3)
 ├── 📄 02 · Moodboard
 ├── 📄 03 · Wireframes             (Mobile 390 + Desktop 1440)
 ├── 📄 04 · Design system          (variables, styles texte, composants)
 ├── 📄 05 · Maquettes Desktop
 ├── 📄 06 · Maquettes Tablette / Mobile
 ├── 📄 07 · Prototype              (flows A et B reliés)
 └── 📄 99 · Archives / brouillons
```

## 6.2 Frames alignés sur les breakpoints Webflow

| Webflow | Largeur frame Figma |
|---|---|
| Desktop (base) | **1440** (conteneur 1280) |
| Tablette | 991 (≈ 834–991) |
| Mobile paysage | 767 |
| Mobile portrait | **390** (Webflow : ≤ 478) |

> Concevoir en priorité **1440** et **390** ; les tailles intermédiaires peuvent être ajustées directement dans Webflow.

## 6.3 Conventions de nommage (Client-First, compatibles Webflow)
Nommer les calques Figma comme les futures classes Webflow :
- Sections : `section_hero`, `section_bestsellers`, `section_quiz-cta`
- Structure : `padding-global` › `container-large` › `padding-section-large`
- Composants : `hero_content`, `product-card_image`, `product-card_price`
- Utilitaires : `button`, `button is-secondary`, `text-size-large`, `heading-style-h2`

## 6.4 Ordre de réalisation des maquettes HD
1. Accueil (desktop + mobile)
2. Fiche produit
3. Catégorie / boutique
4. Mini-panier + checkout
5. Quiz (questions + résultat)
6. Blog liste + article
7. Pages secondaires (Engagement, FAQ, Contact, Abonnement, 404, légales)
8. États : hover, focus, vide, erreur, chargement, produit épuisé

## 6.5 Prototype & tests utilisateurs
- Relier : Accueil → Quiz → Résultat → Panier → Checkout ; Accueil → Catégorie → Fiche → Panier
- Animations Smart Animate simples (ouverture du mini-panier, accordéons)
- Tester avec 3–5 femmes enceintes / jeunes mamans : tâches = « trouver un complément pour le 2e trimestre et l'acheter », « trouver la composition du produit »
- Noter les points de blocage → itérer avant d'intégrer

## 6.6 Checklist de handoff vers Webflow
- [ ] Toutes les couleurs, tailles et espacements sont des **variables** (pas de valeurs en dur)
- [ ] Auto Layout partout (→ Flexbox) ; grilles produits en Grid
- [ ] Calques nommés selon Client-First
- [ ] Images exportées en **WebP**, packshots ≤ 200 Ko, icônes en **SVG**
- [ ] Champs CMS identifiés sur les composants (voir étape 3.2)
- [ ] Textes légaux et mentions produits validés
- [ ] Polices Fraunces + DM Sans ajoutées dans Webflow (Site settings → Fonts)
- [ ] Option : plugin **Figma to Webflow** (officiel) pour transférer variables et composants

## Prochaines étapes (hors Figma)
7. **Intégration Webflow** : variables & classes globales → composants → pages statiques → collections CMS / Ecommerce → templates produit/catégorie → checkout → interactions
8. **Recette & mise en ligne** : responsive, SEO (titres, meta, schéma Product), performances, paiements test (Stripe / PayPal), pages légales, domaine, Google Analytics / consentement cookies
