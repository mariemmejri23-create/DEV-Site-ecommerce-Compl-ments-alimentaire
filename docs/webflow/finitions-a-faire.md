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
- [x] Page statique `/prenatal-complet-t2` construite via le connecteur (15/10/2026), d'après la maquette Figma : fil d'Ariane, galerie, infos d'achat (badge, note, bénéfices, prix, achat unique / abonnement, quantité, bouton, réassurance, avertissement santé), composition en accordéon (tableau VNR), avis sage-femme, avis clients, « Complétez votre routine », FAQ, barre d'achat sticky (≤ 991 px). Classes préfixées `pp_`, responsive tablette + mobile inclus, SEO title/description renseignés
- [x] Accordéons en `<details>/<summary>` natifs : s'ouvrent sans interaction Webflow
- [x] Icône des accordéons « + » → « − » à l'ouverture : CSS dans Page settings → Custom code → Head (pas de JavaScript ; ne s'affiche qu'en Preview / site publié)
- [x] Barre d'annonce, Header et Footer transformés en **Components** (groupe « Global ») sur l'accueil et placés sur la fiche produit : une modification se répercute sur toutes les pages
- [x] Ecommerce activé (15/10/2026)
- [x] Collection Products : champs ajoutés (Étape, Accroche, Bénéfices, Infos prix, Composition, Mode d'emploi, Précautions d'emploi, Avis sage-femme, Note moyenne, Nombre d'avis)
- [x] Page **Fiche produit (template)** construite : barre d'annonce + header + fiche + footer, textes reliés aux champs (nom, étape, note, avis, accroche, bénéfices, infos prix, composition, description, mode d'emploi, précautions, avis sage-femme, barre sticky)
- [x] 11 produits importés par CSV (format Webflow) avec packshots ; champs perso (Étape, Accroche, Bénéfices, Composition, Infos prix, Mode d'emploi, Précautions) remplis via le connecteur ; catégories Préconception / Grossesse / Allaitement / Packs & cures créées et attribuées (catégories d'exemple « mugs » supprimées)
- [x] Devise passée en EUR
- [x] Prix affiché : le champ Ecommerce *Price* n'est pas reliable (ni via le connecteur, ni dans le menu Connect du Designer) → champ texte **« Prix affiché »** créé et relié aux 3 prix du template. ⚠️ À mettre à jour **en même temps que Price** à chaque changement de prix
- [x] Template : image principale reliée à « Main Image » (miniatures retirées)
- [x] Template : note/avis et carte « avis sage-femme » **masqués** tant qu'il n'y a pas de vrais avis (visibilité à réactiver)
- [ ] Sections « Avis clients » et « Souvent associés » : non reprises dans le template (à refaire avec une collection Avis et une Collection List de produits)
- [ ] La page statique `/prenatal-complet-t2` fera doublon avec le produit du même slug → la supprimer une fois le produit saisi
- [x] Vrai bloc **Add to Cart** ajouté et stylé (`pp_atc_form`, `pp_atc_qty`, `pp_atc_btn`), libellé « Quantity » masqué visuellement, bouton « Buy now » masqué (Stripe non connecté), faux bouton supprimé
- [ ] Traduire le texte du bouton « Add to Cart » → « Ajouter au panier » (Designer : double-clic sur le bouton) et le message « This product is out of stock. »
- [ ] Sélecteur achat unique / abonnement : visuel seulement (Webflow ne gère pas l'abonnement → Stripe Billing ou outil tiers, ou V2)
- [ ] Note, avis et filtres : statiques, à brancher sur un outil d'avis (ou une collection CMS « Avis »)

## Avant mise en ligne
- [ ] Textes santé, dosages et allégations validés par un professionnel
- [ ] Pages légales (CGV, mentions légales, confidentialité, livraison & retours), bandeau cookies
- [ ] SEO (titres, meta descriptions), paiement test, forfait Ecommerce Webflow
