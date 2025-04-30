#!/bin/bash


SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

cd "$SCRIPT_DIR" || exit 1

npm run build && \
git add . && \
git commit -m "-" && \
git push

cd build || exit 1

git init
git config user.name gorbachyovKS
git config user.email gorbachyokvKS
git remote add origin https://github.com/sage-coffee/sage-coffee.github.io.git 2>/dev/null || true
git checkout -b gh-pages
git add . && \
git commit -m '-' && \
git push origin gh-pages

if [ $? -eq 0 ]; then
    osascript -e 'tell application "Terminal" to close front window' >/dev/null 2>&1
fi