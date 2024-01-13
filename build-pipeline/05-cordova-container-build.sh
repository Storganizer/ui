#!/bin/bash

echo "Cordova Dev Build"
mkdir -p $(pwd)/local-builds

podman rm -f $(cat version.txt)
podman run -it --name $(cat version.txt) \
    -v $(pwd)/www:/tmp/www:z \
    -v $(pwd)/build-pipeline:/tmp/build-pipeline:z \
    -v $(pwd)/local-builds:/tmp/local-builds:z \
    -v $(pwd)/config.xml:/tmp/config.xml:z \
    -v $(pwd)/package.json:/tmp/package.json:z \
    beevelop/ionic \
        bash /tmp/build-pipeline/container/pipeline.sh
