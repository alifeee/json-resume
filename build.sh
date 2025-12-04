#!/bin/bash
# build then shuffle around files

set -e

echo "build!"

bun run build-pdf

echo "moving to _site…"

mv build/cv.html build/index.html
mv build/cv.pdf build/Alfie-Renn-CV.pdf
mkdir -p _site
cp -r build/* _site/
cp -r public/* _site/

echo "done! find all files in ./_site/"
