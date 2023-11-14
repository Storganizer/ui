
rm -rf ./platforms ./plugins
rm -rf /tmp/local-builds/*


cordova telemetry off
cordova platform add android
cordova platform add electron
cordova build --buildConfig=/tmp/build-pipeline/config/cordova.json

APK=$(find ./ -name *.apk)
AAB=$(find ./ -name *.aab)
APP_IMAGE=$(find ./ -name *.AppImage)

echo "Android Package: $APK"
echo "AppImage: $APP_IMAGE"

cp $APK /tmp/local-builds/
cp $AAB /tmp/local-builds/
cp $APP_IMAGE /tmp/local-builds/

