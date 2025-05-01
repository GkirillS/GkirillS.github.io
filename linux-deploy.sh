#!/bin/sh
npm run build
git add .
git commit -m "-"
git push origin gh-pages