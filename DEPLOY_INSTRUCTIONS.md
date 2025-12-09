# 🚀 Instructions de Déploiement — Marketplace Vape

## Étape 1: Fork du Dépôt

1. Allez à: https://github.com/CHEICK010/marketplace
2. Cliquez sur **Fork** (haut à droite)
3. Laissez les options par défaut et cliquez "Create fork"

Vous avez maintenant votre propre copie: `https://github.com/YOUR_USERNAME/marketplace`

## Étape 2: Configurer Votre Fork Local

```bash
# Cloner votre fork (remplacez YOUR_USERNAME)
git clone https://github.com/YOUR_USERNAME/marketplace.git
cd marketplace

# Ajouter l'upstream pour synchroniser (optionnel)
git remote add upstream https://github.com/CHEICK010/marketplace.git

# Vérifier les remotes
git remote -v
# origin → votre fork
# upstream → repo original
```

## Étape 3: Pousser le Code (votre fork)

```bash
# Assurez-vous d'être sur main
git checkout main

# Pousser tous les commits vers votre fork
git push origin main

# Vérifier que tout est poussé
git status
# "On branch main, nothing to commit, working tree clean"
```

## Étape 4: Activer GitHub Pages

1. Allez à: **https://github.com/YOUR_USERNAME/marketplace/settings/pages**
2. Sous "Build and deployment":
   - **Source**: sélectionner "GitHub Actions"
   - Cliquer "Save"

## Étape 5: Déclencher le Déploiement

### Option A: Via l'interface GitHub

1. Allez à: **Actions** (onglet dans votre repo)
2. Sélectionnez le workflow: "Deploy to GitHub Pages"
3. Cliquez "Run workflow"
4. Attendez que le run passe ✅

### Option B: Via terminal (rebase local)

```bash
git commit --allow-empty -m "trigger deploy"
git push origin main
```

## Étape 6: Vérifier le Déploiement

1. Allez à l'onglet **Actions**
2. Attendez le workflow "Deploy to GitHub Pages" ✅ (vert)
3. Cliquez sur le run réussi pour voir les détails

## Étape 7: Accéder au Site

Après ~1-2 minutes, visitez:

```
https://YOUR_USERNAME.github.io/marketplace/
```

**Exemple**: si votre username GitHub est `marie`, l'URL est:
```
https://marie.github.io/marketplace/
```

## Troubleshooting

### ❌ Erreur 404?
- Attendez 2-3 minutes après le deploy
- Vérifiez que la branche `gh-pages` a été créée (Settings > Pages)
- Rafraîchissez la page (Cmd+Shift+R)

### ❌ Le workflow ne s'exécute pas?
- Vérifiez que `.github/workflows/deploy.yml` existe
- Allez à Settings > Actions et vérifiez que les workflows sont activés
- Pushez un commit vide: `git commit --allow-empty -m "trigger"`

### ❌ Permission denied?
- Vous clonez peut-être le repo original au lieu de votre fork
- Vérifiez: `git remote -v`
- Doit dire: `origin  https://github.com/YOUR_USERNAME/marketplace.git`

## Mettre à Jour le Site

Après modifications locales:

```bash
# Faire vos changements
git add .
git commit -m "feat: Description de la modification"
git push origin main
```

Le workflow GitHub Actions redéploie automatiquement!

## Support

- **Problème de fork?** → https://docs.github.com/en/get-started/quickstart/fork-a-repo
- **GitHub Pages?** → https://pages.github.com
- **Workflow GitHub Actions?** → https://docs.github.com/en/actions

---

**Prêt?** Allez à l'étape 1: https://github.com/CHEICK010/marketplace 🚀
