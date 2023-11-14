#!/bin/bash

echo "Cleanup"
sudo rm -rf ./builds ./dist ./node_modules ./www
mkdir -p ./platforms
mkdir -p ./www
mkdir -p ./builds

echo "Fresh install"
npm install
npm run production-build
./cordova-prepare.sh


echo "Copy artifacts"
cp ./dist/* ./www
cp ./public/* ./www

echo "Build application formats"
docker rm -f $(cat version.txt)
docker run -it --name $(cat version.txt) \
    -v $(pwd)/www:/tmp/www:z \
    -v $(pwd)/container-pipeline.sh:/tmp/container-pipeline.sh:z \
    -v $(pwd)/builds:/tmp/builds:z \
    -v $(pwd)/config.xml:/tmp/config.xml:z \
    -v $(pwd)/cordova-build-config.json:/tmp/cordova-build-config.json:z \
    -v $(pwd)/package.json:/tmp/package.json:z \
    beevelop/ionic \
        bash /tmp/container-pipeline.sh


echo "Fixing artifact permissions"
sudo chown -R claudio: $(pwd)/builds
