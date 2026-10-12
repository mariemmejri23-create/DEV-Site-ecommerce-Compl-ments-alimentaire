# Étape 5 — Moodboard & design system (Figma)

> Les valeurs ci-dessous existent aussi dans [`design-tokens.json`](design-tokens.json)
> (format compatible *Tokens Studio* / variables Figma) et seront recréées en
> **Variables Webflow** à l'intégration.

---

## 5.1 Moodboard — mots-clés
**Douceur · Confiance · Naturel · Clarté · Féminité sans cliché · Scientifique mais chaleureux**

À collecter (Pinterest, Dribbble, sites de marques DTC) et coller dans la page *Moodboard* :
- Photos : femmes enceintes réelles et diverses, lumière naturelle, matières (lin, coton), mains sur le ventre, ingrédients (agrumes, algues, graines)
- Packaging : flacons ambrés ou blancs mats, étiquettes minimalistes
- À éviter : rose bonbon, clichés « bébé », visuels trop médicaux (blouses, pilules en gros plan)

---

## 5.1 bis Logo — « Les 9 lunes » ✅ (validé le 12/10/2026)

- **Symbole :** 9 lunes disposées en arc, qui grandissent (10 → 26 px) et passent du pêche `#F4D6C6` au terracotta `#C9826B`, comme le ventre au fil des 9 mois.
- **Wordmark :** « Neuf Lunes » en Fraunces SemiBold + signature « COMPLÉMENTS GROSSESSE & ALLAITEMENT » en DM Sans Medium 10 px, interlettrage 18 %.
- **Déclinaisons :** version claire (composant Figma `Logo/Neuf Lunes`), version sombre (fond `#2F2A26`, lunes inversées), icône / favicon à 3 lunes (`#E3B6A1` → `#C9826B` → `#A9624C`) sur fond crème.
- **Règle :** sous 120 px de large, utiliser l'icône 3 lunes plutôt que les 9 lunes.

## 5.2 Couleurs

| Rôle | Nom | Hex | Usage |
|---|---|---|---|
| Primaire | **Terracotta doux** | `#C9826B` | Boutons principaux, liens, accents |
| Primaire foncé | Terracotta profond | `#A9624C` | Hover boutons |
| Secondaire | **Sauge** | `#8FA68E` | Badges, icônes « naturel », section engagement |
| Secondaire clair | Sauge pâle | `#E4ECE3` | Fonds de sections |
| Accent | Pêche | `#F4D6C6` | Fonds hero, cartes mises en avant |
| Fond | **Crème** | `#FBF7F2` | Fond général |
| Surface | Blanc | `#FFFFFF` | Cartes, champs |
| Texte | **Brun encre** | `#2F2A26` | Titres et texte |
| Texte secondaire | Taupe | `#6E645C` | Sous-titres, légendes |
| Bordure | Sable | `#E8DFD5` | Séparateurs, contours |
| Succès | Vert | `#4F7A5A` | Ajout panier, validations |
| Alerte | Ambre | `#B7791F` | Avertissements santé |
| Erreur | Rouge | `#B3413A` | Erreurs de formulaire |

**Couleurs par étape** (badges, filtres) : Préconception `#B9A7D6` (lavande) · T1 `#F4D6C6` (pêche) · T2 `#C9826B` (terracotta) · T3 `#8FA68E` (sauge) · Allaitement `#A7C4D6` (bleu doux).

> Accessibilité : vérifier le contraste (WCAG AA ≥ 4,5:1) avec le plugin *Stark* ou *Contrast*.
> Le texte blanc sur `#C9826B` est insuffisant pour du petit texte → utiliser `#A9624C` pour les boutons, ou du texte `#2F2A26`.

---

## 5.3 Typographie (Google Fonts, gratuites et disponibles dans Webflow)

- **Titres :** *Fraunces* (serif douce, élégante) — poids Regular (400) / SemiBold (600) ; Fraunces n'a pas de Medium dans Figma
- **Texte & interface :** *DM Sans* — poids 400/500/700

| Style | Desktop | Mobile | Interligne | Poids |
|---|---|---|---|---|
| H1 | 56 px | 36 px | 1.1 | Fraunces 600 |
| H2 | 40 px | 30 px | 1.2 | Fraunces 600 |
| H3 | 28 px | 24 px | 1.25 | Fraunces 400 |
| H4 | 20 px | 18 px | 1.3 | DM Sans 700 |
| Texte large | 20 px | 18 px | 1.5 | DM Sans 400 |
| Texte | 16 px | 16 px | 1.6 | DM Sans 400 |
| Petit | 14 px | 14 px | 1.5 | DM Sans 400 |
| Label / bouton | 15 px | 15 px | 1 | DM Sans 500, majuscules optionnelles |

---

## 5.4 Espacements, grille, rayons, ombres
- **Échelle d'espacement (base 4) :** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128
- **Grille desktop :** 12 colonnes, conteneur max 1280 px, gouttière 24 px, marges 40 px
- **Grille mobile :** 4 colonnes, marges 20 px, gouttière 16 px
- **Padding de section :** 96 px desktop / 64 px mobile
- **Rayons :** 8 px (champs) · 16 px (cartes) · 999 px (boutons pilule, badges)
- **Ombre :** `0 8px 24px rgba(47, 42, 38, 0.08)` (cartes au survol)

---

## 5.5 Iconographie & images
- Icônes : trait fin arrondi (ex. *Phosphor* ou *Lucide*, style « regular »), 24 px
- Photos : ratio 4:5 pour les produits, 16:9 pour les articles, fond crème uni pour les packshots
- Illustrations : formes organiques (blobs) en sauge / pêche en arrière-plan

---

## 5.6 Composants à créer dans Figma (avec variantes)

| Composant | Variantes / propriétés |
|---|---|
| Bouton | Primaire / Secondaire / Texte · Default / Hover / Disabled · taille M / L · icône oui/non |
| Champ de formulaire | Default / Focus / Erreur · avec label · avec aide |
| Case à cocher / radio | Coché / non coché |
| Badge étape | Préconception / T1 / T2 / T3 / Allaitement |
| Badge label | Bio / Vegan / Sans gluten… |
| Carte produit | Default / Hover · avec/sans badge · en stock / épuisé |
| Carte catégorie (étape) | — |
| Carte article | Verticale / horizontale |
| Carte avis | avec/sans photo |
| Sélecteur achat unique / abonnement | Sélection 1 / 2 |
| Sélecteur quantité | — |
| Accordéon | Fermé / ouvert |
| Onglets | — |
| Encart avertissement santé | — |
| Barre de progression (quiz, livraison offerte) | 0–100 % |
| Carte réponse du quiz | Default / Sélectionnée |
| Header | Desktop / Mobile / Menu ouvert |
| Mini-panier | Vide / Rempli |
| Footer | Desktop / Mobile |
| Toast « Ajouté au panier » | — |

> Utiliser **Auto Layout** partout : il se traduit presque 1:1 en Flexbox dans Webflow.

---

## ✅ Livrables de l'étape 5
- [ ] Page Moodboard
- [ ] Variables Figma (couleurs, espacements, rayons) + styles de texte
- [ ] Bibliothèque de composants avec variantes
- [ ] Vérification des contrastes
