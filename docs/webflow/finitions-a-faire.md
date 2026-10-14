# Webflow — finitions à faire en fin de projet

État : l'accueil desktop a été importé depuis Figma (plugin officiel « Figma to Webflow »).
Ces réglages sont volontairement reportés à la fin.

## Accueil
- [ ] **Polices** : Site settings → Fonts → Google Fonts → ajouter Fraunces (400, 600) et DM Sans (400, 500, 700) — le site s'affiche en Arial tant que ce n'est pas fait
- [ ] **Wrapper** « HD Accueil Desktop 1440 » : Width 100 % (au lieu de 1440 px), renommer la classe `page-wrapper`
- [ ] Bouton « Je m'inscris » sur 2 lignes : Breaking = No wrap + Flex Child = Don't shrink
- [ ] Visuel du hero trop grand : Width 45 %, Max H 600 px
- [ ] Boutons et liens du menu → vrais liens (Wrap in Link Block + page cible)
- [ ] Newsletter → remplacer par un vrai Form Block (sinon aucune inscription enregistrée)
- [x] Version tablette & mobile appliquée via le connecteur Webflow (14/10/2026) : hero et quiz en colonne, grilles 2 colonnes (tablette) puis 1 colonne (mobile), marges 40 px → 20 px, titres réduits (H1 36 px, H2 30 px, H3 22 px), boutons du hero pleine largeur, footer empilé
- [x] Menu mobile ☰ créé (Dropdown natif, classes `menu_mobile*`) : visible sous 991 px, 5 liens
- [ ] Relier les liens du menu (desktop et mobile) aux vraies pages quand elles existeront (actuellement `#`)
- [x] Icône ☰ remplacée par un SVG (classe `menu_burger_svg`, 28 px, trait #2F2A26)
- [ ] Étapes en 2 colonnes sur mobile (actuellement 1 colonne car la classe `etapes_grid` est partagée avec avis, produits, experts et articles) — créer une classe dédiée si besoin
- [ ] Remplacer les emplacements 📷 par les vraies photos

## Fiche produit
- [ ] Activer Ecommerce, coller « HD — Fiche produit — Desktop 1440 » dans la page Product Template
- [ ] Relier les champs à la collection Products (nom, prix, images, description, composition)
- [ ] Mêmes finitions que l'accueil (liens, mobile, barre d'achat sticky mobile)

## Avant mise en ligne
- [ ] Textes santé, dosages et allégations validés par un professionnel
- [ ] Pages légales (CGV, mentions légales, confidentialité, livraison & retours), bandeau cookies
- [ ] SEO (titres, meta descriptions), paiement test, forfait Ecommerce Webflow
