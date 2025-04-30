#!/bin/bash


SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

cd "$SCRIPT_DIR" || exid 1

npm run build && \
git add . && \
git commit -m "-test" && \
git push

if [ $? -eq 0 ]; then
    osascript -e 'tell application "Terminal" to close front window' >/dev/null 2>&1
fi