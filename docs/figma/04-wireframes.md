# Étape 4 — Wireframes basse fidélité (Figma)

> Règles : niveaux de gris uniquement, police système, blocs gris pour les images,
> **mobile-first** (la cible achète surtout sur mobile), puis desktop.
> Frames : **Mobile 390** · **Desktop 1440** (voir breakpoints Webflow dans l'étape 6).
> Chaque section ci-dessous = une section Webflow (`section_[nom]`).

---

## 4.1 Accueil

| # | Section | Contenu | CTA |
|---|---|---|---|
| 0 | Barre d'annonce | « Livraison offerte dès 40 € · Formules validées par des sages-femmes » | — |
| 1 | Header | Logo, menu, recherche, compte, panier (badge quantité) | — |
| 2 | **Hero** | Titre : « Prendre soin de vous, 9 mois et au-delà » · sous-titre · photo femme enceinte · 3 réassurances (icônes) | « Trouver mon complément » (primaire) · « Voir la boutique » (secondaire) |
| 3 | Choisir son étape | 4 cartes : Préconception · Grossesse · Allaitement · Packs | Clic carte → catégorie |
| 4 | Best-sellers | Carrousel / grille de 4 cartes produit | « Ajouter » sur chaque carte |
| 5 | Bloc quiz | Visuel + « 4 questions, 1 minute, la recommandation adaptée » | « Commencer le quiz » |
| 6 | Pourquoi nous | 4 piliers : formules ciblées · transparence · validé par des pros · ingrédients de qualité | « Notre engagement » |
| 7 | Comité santé | Photos + noms + métiers des expertes | — |
| 8 | Avis clientes | 3 avis + note moyenne | — |
| 9 | Abonnement | Comment ça marche en 3 étapes · -10 % | « Découvrir l'abonnement » |
| 10 | Conseils | 3 derniers articles | « Tous les conseils » |
| 11 | Newsletter | « -10 % sur votre première commande » + champ email + case consentement | « Je m'inscris » |
| 12 | Footer | voir sitemap + **avertissement santé** | — |

```
MOBILE (390)               DESKTOP (1440)
┌──────────────┐           ┌──────────────────────────────────────────┐
│ annonce      │           │ annonce                                  │
│ ☰  LOGO  🛒  │           │ LOGO   Boutique Quiz Conseils   🔍 👤 🛒 │
├──────────────┤           ├─────────────────────┬────────────────────┤
│ [  image  ]  │           │ Titre H1            │                    │
│ Titre H1     │           │ sous-titre          │     [ image ]      │
│ sous-titre   │           │ [CTA1] [CTA2]       │                    │
│ [  CTA 1  ]  │           │ ✓ ✓ ✓ réassurance   │                    │
│ [  CTA 2  ]  │           ├─────────┬─────────┬─┴───────┬────────────┤
├──────────────┤           │ Précon. │ Grosse. │ Allait. │ Packs      │
│ [Précon][Gro]│           ├─────────┴─────────┴─────────┴────────────┤
│ [Allai][Pack]│           │ [prod] [prod] [prod] [prod]              │
├──────────────┤           └──────────────────────────────────────────┘
│ ← [prod] →   │
└──────────────┘
```

---

## 4.2 Boutique / Catégorie
- Fil d'Ariane · H1 catégorie · description courte
- **Filtres** : Étape (Préconception, T1, T2, T3, Allaitement) · Besoin (énergie, nausées, immunité, développement du bébé) · Label (vegan, bio) · Prix
  - Mobile : bouton « Filtrer » → panneau plein écran
  - Desktop : colonne gauche 280 px
- Tri : popularité, prix ↑↓, nouveautés
- Grille : 2 colonnes mobile / 3 colonnes desktop
- Bandeau quiz au milieu de la grille (« Vous hésitez ? Faites le quiz »)

### Composant « Carte produit »
```
┌──────────────────┐
│ [badge T2]   ♡   │
│   [ image ]      │
│ Nom du produit   │
│ Bénéfice court   │
│ ★★★★★ (124)      │
│ 24,90 € · 30 j   │
│ [ Ajouter ]      │
└──────────────────┘
```

---

## 4.3 Fiche produit (page la plus importante)
1. **Galerie** (image principale + miniatures ; swipe sur mobile)
2. **Infos d'achat** : badge étape · nom (H1) · note + nb d'avis · 3 bénéfices (puces) · prix + prix / jour · durée de cure
   - Sélecteur **Achat unique / Abonnement (-10 %)**
   - Quantité · **Ajouter au panier** (bouton sticky en bas sur mobile)
   - Réassurances : livraison 48 h · paiement sécurisé · retours
3. **Encart avertissement** : « Demandez conseil à votre médecin ou sage-femme avant toute prise. »
4. **Onglets / accordéons** : Description · Composition & dosages (tableau) · Mode d'emploi · Précautions · Labels & analyses (PDF)
5. Bloc « L'avis de notre sage-femme » (photo + citation)
6. Avis clientes (filtrables par trimestre)
7. « Complétez votre routine » (produits associés / pack)
8. FAQ produit

---

## 4.4 Quiz
- 1 question par écran, barre de progression, bouton retour
- Réponses en grandes cartes cliquables (pouce-friendly)
- Écran résultat : produit recommandé + pourquoi + pack + rappel « ceci n'est pas un avis médical »
- Option : recevoir le résultat par email (consentement)

## 4.5 Panier & checkout
- **Mini-panier slide-in** : produits, quantités, barre « plus que X € pour la livraison offerte », upsell 1 produit, CTA « Commander »
- Checkout Webflow natif : coordonnées → livraison → paiement → récapitulatif (styler les éléments natifs)

## 4.6 Autres pages
| Page | Sections clés |
|---|---|
| Conseils (liste) | Filtres par catégorie, article à la une, grille |
| Article | Titre, auteur expert, temps de lecture, sommaire, contenu, **bloc produit lié**, articles similaires |
| Notre engagement | Process qualité, origine des ingrédients, labels, comité santé, analyses |
| Abonnement | Fonctionnement en 3 étapes, avantages, FAQ abonnement |
| FAQ | Accordéons par thème |
| Contact | Formulaire, email, horaires, lien FAQ |
| 404 | Message doux + liens Boutique / Quiz |

---

## ✅ Livrables de l'étape 4
- [ ] Wireframes mobile + desktop : Accueil, Catégorie, Fiche produit, Quiz, Panier
- [ ] Wireframes des pages secondaires (mobile au minimum)
- [ ] Prototype cliquable basse fidélité pour tester le flow A avec 3–5 personnes
