# Gamme Neuf Lunes — produits à importer dans Webflow

Fichier d'import (format Webflow) : [`produits-import.csv`](produits-import.csv) → Designer → **CMS → Products → Import**.
Le format Webflow n'accepte pas les champs personnalisés (Étape, Accroche, Bénéfices…) : leurs valeurs sont dans [`produits-champs-perso.csv`](produits-champs-perso.csv) et seront ajoutées après l'import.
(Webflow n'autorise pas la création de produits Ecommerce via le connecteur.)

Gamme définie d'après le cadrage (gamme courte, toutes les étapes couvertes, packs par étape) :

| Étape | Produit | Prix | Conditionnement |
|---|---|---|---|
| Préconception | Préconception Essentiel | 19,90 € | 30 gélules |
| 1er trimestre | Prénatal Complet T1 | 22,90 € | 30 gélules |
| 2e trimestre | Prénatal Complet T2 | 24,90 € | 60 gélules |
| 3e trimestre | Prénatal Complet T3 | 24,90 € | 60 gélules |
| T3 → allaitement | Oméga-3 DHA Maman | 19,90 € | 60 capsules |
| Allaitement | Allaitement Douceur | 23,90 € | 60 gélules |
| Toutes étapes (classé T2) | Fer Doux | 14,90 € | 30 gélules |
| Toutes étapes (classé T3) | Magnésium Sérénité | 16,90 € | 60 gélules |
| Pack | Pack Préconception (Préconception + Oméga-3) | 33,90 € | ≈ -15 % |
| Pack | Pack 2e trimestre (T2 + Magnésium) | 35,50 € | ≈ -15 % |
| Pack | Pack Allaitement (Allaitement + Fer Doux) | 32,90 € | ≈ -15 % |

Packs composés sans doublon de nutriments (pas deux sources de DHA dans un même pack).

## ⚠️ Avant publication
- Bénéfices rédigés à partir des **allégations autorisées UE** (registre CE 1924/2006), mais dosages et formulations sont **fictifs** : à remplacer par les fiches techniques réelles et à faire valider par un pharmacien / une sage-femme.
- Champs **Note moyenne**, **Nombre d'avis** et **Avis sage-femme** laissés vides volontairement : afficher de fausses notes ou de faux témoignages sur un site réel est interdit (pratique commerciale trompeuse). Les remplir uniquement avec de vrais avis.
- Catégories (Préconception, Grossesse, Allaitement, Packs) : à créer dans **Ecommerce → Categories** puis à cocher sur chaque produit.
