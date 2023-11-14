#!/bin/bash

# Cordova is serving vom www directory, our webpack Dev Env is not using this at all
# ensure directory exists from cleanup
echo "Preparing for cordova build"

mkdir -p ./www
cp ./dist/* ./www
cp ./public/* ./www

cordova plugin add cordova-plugin-android-permissions
cordova plugin add cordova-plugin-camera

cordova platform add electron
cordova platform add android