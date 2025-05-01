#!/bin/bash

# 1. Определяем и переходим в директорию скрипта
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR" || exit 1

# 2. Загружаем токен из .env, если файл есть
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

# 3. Основной деплой
git pull origin main
npm run build && \
git add . && \
git commit -m "-" && \
git push -f origin main

# 4. Переход в build и публикация
cd build || exit 1

git init
git config user.name "sage-coffee"
git config user.email "Lizagorbachyova97@gmail.com"
git remote add origin https://github.com/sage-coffee/sage-coffee.github.io.git 2>/dev/null || true
git remote set-url origin https://sage-coffee:$GH_TOKEN@github.com/sage-coffee/sage-coffee.github.io.git

git checkout -B gh-pages
git add . && \
git commit -m '-' && \
git push -f origin gh-pages

# 5. Закрытие окна
if [ $? -eq 0 ]; then
    osascript -e 'tell application "Terminal" to close front window' >/dev/null 2>&1
fi
