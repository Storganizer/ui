#!/bin/bash




# find a better, non-outdated image or build one by myself
apt -y update
apt -y purge openjdk-11-jdk
apt -y install openjdk-17-jdk

export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH


echo "und jetzt die Version"
java -version


apt upgrade --yes
apt dist-upgrade --yes

echo y | sdkmanager "build-tools;35.0.0"

rm -rf ./platforms ./plugins

RELEASE=""
DEV="-dev"
while [ $# -gt 0 ]; do
  case "$1" in
    --release)
      RELEASE="--release"
      DEV=""
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
# diff
cordova plugin add cordova-plugin-android-permissions
cordova plugin add cordova-plugin-camera
cordova platform add android@14.0.1

#cordova build --buildConfig=/tmp/build-config/appimage.json --release -- --gradleArg=-PcdvBuildMultipleApks=true --packageType=apk
#cordova build --buildConfig=/tmp/build-config/appimage.json --release -- --packageType=apk

cordova build $RELEASE -- --packageType=apk
# diff

APP_IMAGE=$(find ./ -name *.apk)

echo "APK: $APP_IMAGE"

cp --force $APP_IMAGE /tmp/local-builds/android 2> >(grep -v "are the same file" >&2)
