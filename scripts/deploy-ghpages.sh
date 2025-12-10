#!/usr/bin/env bash
set -euo pipefail

# Usage: ./scripts/deploy-ghpages.sh
# Publie le contenu de dist/ sur la branche gh-pages

REPO_DIR="$(pwd)"
DIST_DIR="$REPO_DIR/dist"
REMOTE="origin"
BRANCH="gh-pages"

if [ ! -d "$DIST_DIR" ]; then
  echo "Erreur: dossier dist/ introuvable. Exécutez 'npm run build' d'abord."
  exit 1
fi

echo "Publishing $DIST_DIR to branch $BRANCH on remote $REMOTE"

# Create a temporary worktree for the gh-pages branch
TMP_DIR=$(mktemp -d)

git worktree add -B $BRANCH "$TMP_DIR" $REMOTE/$BRANCH 2>/dev/null || git worktree add -B $BRANCH "$TMP_DIR"

# Clean and copy
rm -rf "$TMP_DIR"/*
cp -R "$DIST_DIR"/* "$TMP_DIR"/

# Commit and push
pushd "$TMP_DIR" > /dev/null
git add --all
if git diff --quiet --cached; then
  echo "No changes to deploy (branch $BRANCH up-to-date)."
else
  git commit -m "chore: deploy site $(date -u +"%Y-%m-%d %H:%M:%S UTC")"
  git push $REMOTE $BRANCH --force
  echo "Deployed to $REMOTE/$BRANCH"
fi
popd > /dev/null

# Cleanup
git worktree remove "$TMP_DIR"
rm -rf "$TMP_DIR"

echo "Done."
