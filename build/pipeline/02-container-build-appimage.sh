#!/bin/bash

rm -rf ./platforms ./plugins

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

VERSION=$(cat /tmp/version.txt)
sed "s/{{VERSION}}/${VERSION}${DEV}/g" /tmp/orig-config.xml > /tmp/config.xml

bash  /tmp/pipeline/01-container-build-prepare.sh

cordova telemetry off
cordova platform add electron
#cordova build --buildConfig=/tmp/build-config/appimage.json --release -- --gradleArg=-PcdvBuildMultipleApks=true --packageType=apk
#cordova build --buildConfig=/tmp/build-config/appimage.json --release -- --packageType=apk
cordova build --buildConfig=/tmp/build-config/appimage.json $RELEASE

if [ "$GITHUB" -eq "1" ]; then
  APP_IMAGE=$(find ./ -name *.AppImage)

  echo "AppImage: $APP_IMAGE"

  mkdir -p /tmp/local-builds/appimage
  cp --force $APP_IMAGE /tmp/local-builds/appimage 2> >(grep -v "are the same file" >&2)
fi
