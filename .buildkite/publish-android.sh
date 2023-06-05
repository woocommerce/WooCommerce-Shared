#!/bin/bash -e

# Copy the JavaScript bundle
buildkite-agent artifact download dist/bundles/bundle-android.js .

mkdir -p ./libraries/android/library/build/assets
cp ./dist/bundles/bundle-android.js ./libraries/android/library/build/assets/index.android.bundle

cd ./libraries/android/library
./gradlew -PwillPublishBinary=true :library:prepareToPublishToS3 `prepare_to_publish_to_s3_params` :library:publish

