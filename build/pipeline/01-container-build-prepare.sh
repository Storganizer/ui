#!/bin/bash

echo "Cleanup"
rm -rf ./builds ./dist ./node_modules ./platforms ./plugins ./www

echo "Npm Install"
npm install

echo "Npm Build"
npm run build

echo "Preparing for cordova build"

mkdir -p ./www
cp ./dist/* ./www
cp ./public/* ./www

exit 0
