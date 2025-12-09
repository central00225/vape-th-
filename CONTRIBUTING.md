# Contributing — Améliorations et Modifications

Bienvenue ! Ce guide explique comment contribuer et améliorer la Vape Marketplace.

## Avant de Commencer

1. Forkez le dépôt principal
2. Clonez votre fork: `git clone https://github.com/YOUR_USERNAME/marketplace.git`
3. Créez une branche: `git checkout -b feat/votre-feature`

## Sujets de Contribution

### Ajout de Produits

Éditer `src/data/products.js`:
```javascript
export const products = [
  // ... existants
  { id: 6, title: "Mon Produit", price: 12.99, category: "E-Liquides", description: "Description" }
]
```

Puis committer:
```bash
git add src/data/products.js
git commit -m "feat: Ajouter produit X"
git push origin feat/votre-feature
```

### Amélioration UI

Modifier `src/styles.css` ou `src/App.jsx`:
```bash
git add src/
git commit -m "style: Améliorer apparence boutons"
git push origin feat/votre-feature
```

### Ajouter Fonctionnalités

Exemples populaires:
- **Vérification d'âge** (modal au chargement)
- **Sauvegarde panier** (localStorage)
- **Filtres prix** avancés
- **Images produits** (CDN ou URL)
- **Avis clients** système

Créez une issue ou PR avec votre idée!

## Standards de Code

- Noms variables clairs: `userName` pas `u`
- Indentation: 2 espaces
- JSX bien formaté
- Pas de console.log en production

## Tester Localement

```bash
npm run dev
# http://localhost:5173
```

Vérifiez:
- Pas d'erreurs console
- Responsive (desktop & mobile)
- Tous les boutons fonctionnent

## Pousser et PR

```bash
git add .
git commit -m "type: message descriptif"
git push origin feat/votre-feature
```

Ouvrez une Pull Request vers `main` avec:
- Description claire
- Screenshots si UI change
- Lien vers issue si applicable

## Roadmap (Idées)

- [ ] Intégration Stripe Checkout
- [ ] Vérification d'âge
- [ ] Backend Node/Express pour persistance
- [ ] Image products (Cloudinary, etc.)
- [ ] Dark/Light mode toggle
- [ ] Favoris/Wishlist
- [ ] Notifications toast (ajout panier)
- [ ] Amélioration SEO

## Support & Questions

- Ouvrez une **Issue** pour bugs
- Ouvrez une **Discussion** pour idées
- Rejoignez notre communauté !

Merci pour votre contribution! 🚀
