# Étape 3 — Arborescence & user flows (FigJam)

> L'arborescence est pensée pour Webflow : pages statiques + **templates CMS / Ecommerce**
> (Product, Category, Blog Post) générés automatiquement.

---

## 3.1 Arborescence (sitemap)

```
Accueil (/)
│
├── Boutique (/boutique)                      ← page Ecommerce « All products »
│   ├── Catégorie : Préconception            ← template Category
│   ├── Catégorie : Grossesse
│   │     (filtres : 1er · 2e · 3e trimestre)
│   ├── Catégorie : Allaitement & post-partum
│   ├── Catégorie : Packs & cures
│   └── Fiche produit (/product/[slug])      ← template Product
│
├── Quiz « Trouver mon complément » (/quiz)
├── Abonnement (/abonnement)
├── Offrir (/offrir)                          ← coffrets + carte cadeau
│
├── Conseils / Blog (/conseils)               ← collection CMS « Articles »
│   ├── Catégorie : 1er trimestre / 2e / 3e / Allaitement / Nutrition
│   └── Article (/conseils/[slug])           ← template Article
│
├── Notre engagement (/notre-engagement)      ← qualité, labels, comité santé
├── À propos (/a-propos)
├── FAQ (/faq)
├── Contact (/contact)
│
├── Compte client (/compte)                   ← Webflow User Accounts (si activé)
├── Panier (/checkout · modal panier)         ← pages Ecommerce natives
├── Confirmation de commande
│
└── Pages légales (footer)
    ├── Mentions légales
    ├── CGV
    ├── Politique de confidentialité & cookies
    └── Livraison & retours
```

### Navigation principale (header)
`Logo` · **Boutique ▾** (Préconception / Grossesse / Allaitement / Packs) · **Quiz** · **Conseils** · **Notre engagement** · 🔍 · 👤 · 🛒

### Footer
Newsletter · Liens boutique · Aide (FAQ, Livraison, Contact) · Légal · Réseaux sociais · Moyens de paiement · Avertissement santé

---

## 3.2 Structure CMS / Ecommerce Webflow (à anticiper dans Figma)

| Collection | Champs clés |
|---|---|
| **Products** (Ecommerce) | Nom, slug, prix, prix barré, images (galerie), description courte, bénéfices (×3), étape (référence multiple → Étapes), composition (rich text), tableau nutritionnel (rich text), mode d'emploi, précautions, labels (multi-référence), nb de gélules / durée de cure, note moyenne |
| **Categories** (Ecommerce) | Nom, slug, image, description |
| **Étapes** (CMS) | Préconception, T1, T2, T3, Allaitement — couleur, icône |
| **Labels** (CMS) | Bio, Vegan, Sans gluten, Fabriqué en France… — icône |
| **Articles** (CMS) | Titre, image, catégorie, auteur, temps de lecture, contenu, produits liés (multi-référence) |
| **Auteurs / Experts** (CMS) | Nom, photo, métier (sage-femme, nutritionniste…), bio |
| **Avis** (CMS) | Prénom, note, texte, produit (référence), mois de grossesse |
| **FAQ** (CMS) | Question, réponse, catégorie |

> Concevoir les composants Figma avec ces champs = intégration Webflow beaucoup plus rapide.

---

## 3.3 User flows

### Flow A — Achat via le quiz (parcours principal)
```
Accueil ──► CTA « Trouver mon complément »
   └─► Quiz Q1 : Où en êtes-vous ? (projet bébé / enceinte / j'allaite)
        └─► Q2 : Si enceinte → quel trimestre ?
             └─► Q3 : Besoins (fatigue, nausées, alimentation végétarienne…)
                  └─► Q4 : Préférences (vegan, bio, format)
                       └─► Résultat : 1 produit recommandé + 1 pack
                            ├─► Ajouter au panier ──► Panier ──► Checkout ──► Confirmation
                            └─► Voir la fiche produit
```

### Flow B — Achat direct par catégorie
```
Accueil / Header ──► Boutique ──► Filtre « 2e trimestre »
   └─► Fiche produit ──► choisir : achat unique / abonnement ──► Ajouter au panier
        └─► Mini-panier (slide-in) ──► Checkout (adresse → livraison → paiement) ──► Confirmation
```

### Flow C — Contenu → produit (SEO)
```
Google ──► Article « Quelles vitamines au 1er trimestre ? »
   └─► Bloc produit lié dans l'article ──► Fiche produit ──► Panier
```

### Flow D — Réachat (cliente fidèle)
```
Email de rappel « Votre cure se termine dans 7 jours »
   └─► Lien direct ──► Panier pré-rempli ──► Checkout express
```

---

## ✅ Livrables de l'étape 3
- [ ] Sitemap dans FigJam
- [ ] Schéma des collections CMS
- [ ] 4 user flows
