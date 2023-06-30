#!/bin/bash -e

echo "--- :nodejs: Installing Node"
nvm install

echo "--- :yarnpkg: Installing yarn"
npm install -g yarn

# Install `react-native` dependencies because we need access to
# `node_modules/@react-native-community/cli-platform-android/native_modules.gradle` file
# to enable native modules autolinking from Gradle
# https://reactnative.dev/docs/integration-with-existing-apps?language=kotlin#enable-native-modules-autolinking
echo "--- :yarnpkg: Download JS Dependencies"
yarn install

# Copy the JavaScript bundle
buildkite-agent artifact download dist/bundles/bundle-android.js .

mkdir -p ./libraries/android/library/build/assets
cp ./dist/bundles/bundle-android.js ./libraries/android/library/build/assets/index.android.bundle

cd ./libraries/android/
./gradlew -PwillPublishBinary=true :library:prepareToPublishToS3 `prepare_to_publish_to_s3_params` :library:publish

