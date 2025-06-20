#!/bin/bash

rm -rf ./platforms ./plugins

apt update && DEBIAN_FRONTEND=noninteractive
apt -y install tree
npm install -g cordova


RELEASE=""
DEV="-dev"
GITHUB=0
while [ $# -gt 0 ]; do
  case "$1" in
    --release)
      RELEASE="--release"
      DEV=""
      ;;

    --github)
      GITHUB=1
      ;;

    *)
      printf "***************************\n"
      printf "* Error: Invalid argument.*\n"
      printf "***************************\n"
      exit 1
  esac
  shift
done

cp ./build/config/cordova.xml ./orig-config.xml

VERSION=$(cat ./version.txt)
sed "s/{{VERSION}}/${VERSION}${DEV}/g" ./orig-config.xml > ./config.xml

cordova telemetry off
cordova platform add electron
cordova build --buildConfig=$(pwd)/build/config/appimage.json $RELEASE


#cordova build --buildConfig=./build-config/appimage.json --release -- --gradleArg=-PcdvBuildMultipleApks=true --packageType=apk
#cordova build --buildConfig=./build-config/appimage.json --release -- --packageType=apk

if [ "$GITHUB" -ne "1" ]; then
  APP_IMAGE=$(find ./ -name *.AppImage)

  echo "AppImage: $APP_IMAGE"

  mkdir -p ./local-builds/appimage
  cp --force $APP_IMAGE ./local-builds/appimage 2> >(grep -v "are the same file" >&2)
fi
