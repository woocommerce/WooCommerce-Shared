#!/bin/bash -e

cd ./libraries/android/
mkdir -p library/build/assets
buildkite-agent artifact download dist/bundles/bundle-android.js library/build/assets/index.android.bundle

./gradlew -PwillPublishBinary=true :library:prepareToPublishToS3 `prepare_to_publish_to_s3_params` :library:publish

