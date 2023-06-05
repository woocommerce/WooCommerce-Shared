#!/bin/bash -e

cd ./libraries/android/
./gradlew -PwillPublishBinary=true :library-native-bridge:prepareToPublishToS3 `prepare_to_publish_to_s3_params` :library:publish

