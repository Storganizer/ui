#!/bin/bash

apt update 
apt -y install nodejs npm unzip wget gradle android-sdk #android-tools-adb android-sdk-build-tools

# Set environment variables
export ANDROID_HOME=/opt/android-sdk
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools

# Create directories
mkdir -p $ANDROID_HOME/cmdline-tools

# Download and extract command line tools
cd /tmp
wget https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip -O cmdline-tools.zip
unzip cmdline-tools.zip
mv cmdline-tools $ANDROID_HOME/cmdline-tools/latest
rm cmdline-tools.zip
cd -

# Accept licenses and install basic packages
yes | sdkmanager --licenses
sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"

echo y | sdkmanager "build-tools;35.0.0"
npm install -g cordova

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

VERSION=$(cat ./version.txt)
sed "s/{{VERSION}}/${VERSION}${DEV}/g" ./orig-config.xml > ./config.xml

cordova telemetry off
# diff
cordova plugin add cordova-plugin-android-permissions
cordova plugin add cordova-plugin-camera
cordova platform add android@14.0.1
cordova build $RELEASE -- --packageType=apk


if [ "$GITHUB" -ne "1" ]; then
  APP_IMAGE=$(find ./ -name *.apk)

  echo "AppImage: $APP_IMAGE"

  mkdir -p ./local-builds/android/
  cp --force $APP_IMAGE ./local-builds/android/ 2> >(grep -v "are the same file" >&2)
fi
