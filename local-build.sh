#!/bin/bash

rm -rf ./www ./dist ./node_modules ./platforms
npm install
npm run production-build
npm run cordova-prepare

npx cordova build --buildConfig=$(pwd)/cordova-build-config.json