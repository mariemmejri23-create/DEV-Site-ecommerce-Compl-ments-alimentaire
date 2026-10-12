# Plugin Figma — import de la conception

Ce plugin crée automatiquement dans ton fichier Figma tout le contenu de `docs/figma/` :

| Page Figma | Contenu généré |
|---|---|
| 00 · Cover | Page de garde du projet |
| 01 · Brainstorming | Concept, noms de marque (vote), mind map, problèmes → solutions, SWOT, réglementation, MoSCoW, personas, customer journey, arborescence, user flows |
| 02 · Moodboard | Mots-clés, emplacements d'images à remplir, « à éviter » |
| 03 · Wireframes | Accueil + fiche produit, en mobile 390 et desktop 1440 |
| 04 · Design system | Nuancier (lié aux variables), typographie, composants : Bouton (variantes), Badge étape (5 variantes), Carte produit, Avertissement santé |
| 05 → 07 | Pages prêtes pour les maquettes HD et le prototype |

Il crée aussi :
- **Variables** : collection « Couleurs » (18 couleurs) et « Espacements & rayons »
- **Styles de texte** : `Desktop/H1…Bouton` et `Mobile/H1…Bouton` (Fraunces + DM Sans)

## Installation (2 minutes, application Figma **desktop** obligatoire)

1. Télécharge ce dossier `figma-plugin/` sur ton ordinateur (sur GitHub : bouton **Code → Download ZIP**, puis dézippe).
2. Ouvre l'application **Figma Desktop** et crée un nouveau fichier Design (ex. « Neuf Lunes — Site »).
3. Menu **Plugins → Development → Import plugin from manifest…**
4. Sélectionne le fichier `figma-plugin/manifest.json`.
5. Lance-le : **Plugins → Development → Neuf Lunes — Import conception**.
6. Après quelques secondes, le message « ✅ Conception Neuf Lunes importée » s'affiche.

> Le plugin peut être relancé : il remplace uniquement ce qu'il a lui-même créé et met à jour
> les variables et les styles (tes ajouts manuels sont conservés).
> Si Fraunces ou DM Sans ne sont pas disponibles, il utilise Inter et l'indique dans le message.
