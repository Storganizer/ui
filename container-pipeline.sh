
rm -rf ./platforms ./plugins

cordova telemetry off
cordova platform add android
cordova platform add electron
cordova build --buildConfig=/tmp/cordova-build-config.json
#cordova build --prod --release --buildConfig=/tmp/cordova-build-config.json

APK=$(find ./ -name *.apk)
AAB=$(find ./ -name *.aab)
APP_IMAGE=$(find ./ -name *.AppImage)

echo "Android Package: $APK"
echo "Android Release: $AAB"
echo "AppImage: $APP_IMAGE"

cp $APK /tmp/builds/
cp $AAB /tmp/builds/
cp $APP_IMAGE /tmp/builds/

