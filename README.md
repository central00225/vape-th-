# Vape Marketplace — Production Ready

Marketplace moderne pour vape (React 18 + Vite) prête à déployer sur GitHub Pages.

## Quick Start

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # build production
npm run preview   # test build localement
```

## Déploiement GitHub Pages (Automatique)

1. **Pusher la branche** sur votre fork/repo:
   ```bash
   git push origin feat/vape-market
   ```

2. **GitHub Actions déclenche automatiquement** le workflow `.github/workflows/deploy.yml`:
   - Installe dépendances
   - Build Vite en `dist/`
   - Publie sur GitHub Pages (branche `gh-pages`)

3. **Accéder au site** (après 1-2 min):
   ```
   https://YOUR_USERNAME.github.io/marketplace/
   ```

## Arborescence

```
repo/
├── index.html
├── src/
│   ├── App.jsx        # Composant principal
│   ├── main.jsx       # Entrée React
│   ├── styles.css     # Styles globaux
│   └── data/
│       └── products.js # Données produits
├── vite.config.js
├── package.json
└── .github/workflows/deploy.yml
```

## Fonctionnalités

✅ Grille produits responsive  
✅ Recherche et filtrage par catégorie  
✅ Panier client-side  
✅ Modal produit  
✅ Styles modernes (dark theme)  
✅ Workflow CI/CD automatique  

## Notes Légales

⚠️ **Important**: La vente de produits contenant de la nicotine est réglementée.
- Vérifiez les lois locales
- Implémenter une vérification d'âge si requis
- Ajouter mentions légales et conditions générales

## Ajouter des produits

Éditer `src/data/products.js`:
```javascript
{ id: 6, title: "Nouveau produit", price: 15.99, category: "E-Liquides", description: "Description courte" }
```

## Intégration Paiement (Optionnel)

Vous pouvez ajouter:
- **Stripe Checkout** (recommandé)
- **PayPal**
- **Appel API backend** pour traiter commandes

Demander assist pour intégration serverless.

## Support

Questions ? Consulter:
- [Vite Docs](https://vitejs.dev)
- [React Docs](https://react.dev)
- [GitHub Pages](https://pages.github.com)
