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
    --workdir '/tmp' \
    -v $SCRIPT_PATH/version.txt:/tmp/version.txt:z \
    -v $SCRIPT_PATH/src:/tmp/src:z \
    -v $SCRIPT_PATH/webpack.config.js:/tmp/webpack.config.js:z \
    -v $SCRIPT_PATH/public:/tmp/public:z \
    -v $SCRIPT_PATH/build/pipeline:/tmp/build/pipeline:z \
    -v $SCRIPT_PATH/build/config/appimage.json:/tmp/build/config/appimage.json:z \
    -v $SCRIPT_PATH/local-builds:/tmp/local-builds:z \
    -v $SCRIPT_PATH/build/config/cordova.xml:/tmp/build/config/cordova.xml:z \
    -v $SCRIPT_PATH/package.json:/tmp/package.json:z \
    docker.io/ubuntu:latest \
        bash -c "./build/pipeline/01-container-build-prepare.sh && ./build/pipeline/02-container-build-android.sh $RELEASE"