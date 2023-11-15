#!/bin/bash

bash ./build-pipeline/scripts/cleanup.sh
bash ./build-pipeline/scripts/prepare.sh
bash ./build-pipeline/05-cordova-container-build.sh
