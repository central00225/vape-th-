# 📑 Vape Marketplace — Index de Documentation

Bienvenue! Ce fichier vous guide vers la bonne documentation selon votre besoin.

## 🚀 Je veux déployer sur GitHub Pages

**→ Lisez:** `GITHUB_PAGES_SETUP.md` (le plus complet!)

ou pour plus de détails étape par étape:

**→ Lisez:** `DEPLOY_INSTRUCTIONS.md` (français, ultra-détaillé)

## 💻 Je veux développer localement

**→ Lisez:** `README.md` (quick start)

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build production
```

## �� Je veux contribuer au projet

**→ Lisez:** `CONTRIBUTING.md`

- Ajouter des produits
- Améliorer l'UI
- Proposer des fonctionnalités
- Créer des issues et PRs

## 📋 Fichiers par Priorité

### ⭐ ESSENTIELS (commencez ici!)
1. **GITHUB_PAGES_SETUP.md** — Le résumé complet + déploiement
2. **DEPLOY_INSTRUCTIONS.md** — Guide français détaillé

### �� UTILES
3. **README.md** — Documentation générale + features
4. **DEPLOYMENT.md** — Guide en anglais
5. **CONTRIBUTING.md** — Pour les contributions

### 🛠️ DÉVELOPPEMENT
6. **QUICK_START.sh** — Script d'aide (bash)
7. **src/** — Code source React

## 🎯 Cas d'Usage

### Cas 1: "Je veux juste déployer rapidement"
```
1. Lire: GITHUB_PAGES_SETUP.md (5 min)
2. Faire: Fork → Clone → Push → Deploy
3. Résultat: Site live sur https://YOU.github.io/marketplace/
```

### Cas 2: "Je veux développer et ajouter des produits"
```
1. Lire: README.md (2 min)
2. Lancer: npm install && npm run dev
3. Éditer: src/data/products.js
4. Tester: http://localhost:5173
5. Pousser: git push origin main
```

### Cas 3: "Je veux contribuer au projet"
```
1. Lire: CONTRIBUTING.md (5 min)
2. Fork → Clone
3. Créer branche: git checkout -b feat/ma-feature
4. Commit & Push
5. Ouvrir Pull Request
```

## 🔍 Recherche Rapide

Vous cherchez info sur...

| Topic | Fichier |
|-------|---------|
| Comment déployer? | GITHUB_PAGES_SETUP.md |
| Étapes détaillées (FR)? | DEPLOY_INSTRUCTIONS.md |
| Features disponibles? | README.md |
| Code React? | src/App.jsx |
| Données produits? | src/data/products.js |
| Styles CSS? | src/styles.css |
| Workflow CI/CD? | .github/workflows/deploy.yml |
| Contribuer? | CONTRIBUTING.md |
| Script d'aide? | QUICK_START.sh |

## ✨ Architecture du Projet

```
marketplace/
├── 📁 src/                    # Code source
│   ├── App.jsx                # Composant principal (React)
│   ├── main.jsx               # Point d'entrée
│   ├── styles.css             # Styles globaux
│   └── data/products.js       # Données (modifiable)
├── 📁 .github/workflows/      # Automation
│   └── deploy.yml             # GitHub Actions
├── 📄 index.html              # HTML root
├── 📄 vite.config.js          # Config build
├── 📄 package.json            # Dépendances
├── 📁 dist/                   # Build output (152 KB)
└── 📚 Documentation:
    ├── INDEX.md               # 👈 Vous êtes ici
    ├── README.md              # Générale
    ├── GITHUB_PAGES_SETUP.md  # Déploiement (complet)
    ├── DEPLOY_INSTRUCTIONS.md # Déploiement (FR, détaillé)
    ├── DEPLOYMENT.md          # Déploiement (EN)
    ├── CONTRIBUTING.md        # Contributions
    └── QUICK_START.sh         # Script d'aide
```

## 🚀 Raccourcis Clés

```bash
# Dev local
npm run dev              # Lancer serveur dev
npm run build           # Build production
npm run preview         # Tester build local

# Git
git checkout main       # Aller sur main
git push origin main    # Pousser vers GitHub
git status              # Vérifier état

# GitHub Pages
# Settings → Pages → Source: GitHub Actions
# Actions → Deploy to GitHub Pages → Run workflow
```

## ⚡ TL;DR (Résumé Ultra Court)

1. **Fork** https://github.com/CHEICK010/marketplace
2. **Clone** votre fork
3. **Push** vers `main`
4. **Settings → Pages** → Source: GitHub Actions
5. **Attendez** 2 min
6. **Visitez** https://YOU.github.io/marketplace/ ✅

## 🆘 Besoin d'Aide?

- Problème de déploiement? → `DEPLOY_INSTRUCTIONS.md`
- Problème technique? → `README.md`
- Veux contribuer? → `CONTRIBUTING.md`
- Question autre? → Ouvrez une GitHub Issue

---

**Prêt?** Commencez par `GITHUB_PAGES_SETUP.md` ou `DEPLOY_INSTRUCTIONS.md`! 🚀
