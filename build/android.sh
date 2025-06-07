#!/bin/bash

RELEASE=""
while [ $# -gt 0 ]; do
  case "$1" in
    --release)
      RELEASE="--release"
      ;;
    *)
      printf "***************************\n"
      printf "* Error: Invalid argument.*\n"
      printf "***************************\n"
      exit 1
  esac
  shift
done

SCRIPT_PATH=$(realpath "$(dirname "$(realpath "$0")")/../")

echo "Cordova Build"

mkdir -p $SCRIPT_PATH/local-builds
mkdir -p $SCRIPT_PATH/www

podman rm -f storganizer-build-android-$(cat version.txt)
podman run -it --name storganizer-build-android-$(cat version.txt) \
    -v $SCRIPT_PATH/version.txt:/tmp/version.txt:z \
    -v $SCRIPT_PATH/src:/tmp/src:z \
    -v $SCRIPT_PATH/webpack.config.js:/tmp/webpack.config.js:z \
    -v $SCRIPT_PATH/public:/tmp/public:z \
    -v $SCRIPT_PATH/build/pipeline:/tmp/pipeline:z \
    -v $SCRIPT_PATH/build/config/appimage.json:/tmp/build-config/appimage.json:z \
    -v $SCRIPT_PATH/local-builds:/tmp/local-builds:z \
    -v $SCRIPT_PATH/build/config/cordova.xml:/tmp/orig-config.xml:z \
    -v $SCRIPT_PATH/package.json:/tmp/package.json:z \
    beevelop/ionic \
        bash /tmp/pipeline/02-container-build-android.sh $RELEASE