#!/bin/bash

bash ./build-pipeline/01-cleanup.sh
bash ./build-pipeline/02-npm-install.sh
bash ./build-pipeline/03-npm-build.sh
bash ./build-pipeline/04-cordova-prepare.sh
bash ./build-pipeline/05-cordova-container-build.sh
