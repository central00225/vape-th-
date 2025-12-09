# Guide de Déploiement — GitHub Pages

## Étapes pour déployer votre Vape Marketplace sur GitHub Pages

### 1. Configuration du Repo GitHub

```bash
# Cloner votre fork
git clone https://github.com/YOUR_USERNAME/marketplace.git
cd marketplace

# Ajouter le remote upstream (optionnel)
git remote add upstream https://github.com/CHEICK010/marketplace.git
```

### 2. Pousser la branche `feat/vape-market`

```bash
git push origin feat/vape-market
```

### 3. Configurer GitHub Pages

1. Allez sur **Settings** > **Pages**
2. Sous "Build and deployment":
   - Source: **GitHub Actions**
   - Cliquez sur "Save"

3. Le workflow `.github/workflows/deploy.yml` se déclenche automatiquement

### 4. Vérifier le déploiement

1. Allez à l'onglet **Actions**
2. Cliquez sur "Deploy to GitHub Pages"
3. Attendez que le run passe (✅ vert)

### 5. Accéder au site

Après ~1-2 minutes:

```
https://YOUR_USERNAME.github.io/marketplace/
```

Remplacez `YOUR_USERNAME` par votre nom utilisateur GitHub.

## Troubleshooting

### Le workflow n'a pas démarré?
- Vérifiez que `.github/workflows/deploy.yml` existe
- Pushez à nouveau: `git push origin feat/vape-market`

### Le site 404?
- Attendez 2-3 minutes pour propagation
- Vérifiez Settings > Pages que la branche `gh-pages` est sélectionnée
- Vérifiez l'URL: `https://USERNAME.github.io/marketplace/` (pas sans `/marketplace/`)

### Build échoue dans Actions?
- Cliquez sur le run échoué
- Consultez les logs (onglet "Run npm ci", "Build", etc.)
- Cause commune: version Node.js incompatible

## Mise à Jour du Site

Pour mettre à jour le site après modifications:

```bash
# Faire vos changements
git add .
git commit -m "feat: Ajouter nouveaux produits"
git push origin feat/vape-market
```

GitHub Actions rebuild et redéploie automatiquement!

## Configuration DNS Personnalisé (Optionnel)

Si vous voulez utiliser votre domaine:

1. Ajoutez un fichier `CNAME` à la racine:
   ```
   votre-domaine.com
   ```

2. Configurez vos DNS pour pointer vers GitHub Pages

3. Allez à Settings > Pages > Custom Domain

## Support

- [GitHub Pages Docs](https://pages.github.com)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
