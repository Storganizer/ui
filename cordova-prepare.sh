#!/bin/bash

rm -rf ./www
mkdir -p ./www
cp ./dist/* ./www
cp ./public/* ./www

#export ANDROID_HOME=/home/claudio/Android/Sdk
#export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-11.0.18.0.10-1.fc37.x86_64

rm -rf ./platforms

#npx cordova plugin add cordova-plugin-settings-hook
npx cordova plugin add cordova-plugin-android-permissions
npx cordova plugin add cordova-plugin-camera
npx cordova platform add electron
npx cordova platform add android
#npx cordova platform add osx
#npx cordova platform add ios
#npx cordova platform add windows
