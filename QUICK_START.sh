#!/bin/bash

echo "🚀 Vape Marketplace — Quick Start"
echo "=================================="
echo ""

# Vérifier Git
if ! command -v git &> /dev/null; then
    echo "❌ Git n'est pas installé. Installez-le: https://git-scm.com"
    exit 1
fi

# Vérifier Node
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Installez-le: https://nodejs.org"
    exit 1
fi

echo "✅ Git et Node.js détectés"
echo ""

# Demander username GitHub
read -p "Entrez votre username GitHub: " github_user

if [ -z "$github_user" ]; then
    echo "❌ Username GitHub requis"
    exit 1
fi

echo ""
echo "📦 Installation des dépendances..."
npm install

echo ""
echo "✨ Build production..."
npm run build

echo ""
echo "📝 Prochaines étapes:"
echo "1. Forkez le repo: https://github.com/CHEICK010/marketplace"
echo "2. Clonez votre fork: git clone https://github.com/$github_user/marketplace.git"
echo "3. Copiez les fichiers du build dans votre fork"
echo "4. Pushez: git push origin main"
echo "5. Allez à: https://github.com/$github_user/marketplace/settings/pages"
echo "6. Sélectionnez 'GitHub Actions' comme source"
echo "7. Accédez au site: https://$github_user.github.io/marketplace/"
echo ""
echo "✅ C'est prêt!"
