#!/bin/bash -e

# For Docker to have access to nvm
source /root/.bashrc

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

echo "--- :android: Publishing React Native Libraries"

REACT_NATIVE_PROJECTS_TO_PUBLISH=(
react-native-async-storage_async-storage
react-native-safe-area-context
react-native-screen
)

PREPARE_TO_PUBLISH_T0_S3_PARAMS=`prepare_to_publish_to_s3_params`

for project in "${REACT_NATIVE_PROJECTS_TO_PUBLISH[@]}"
do
    ./gradlew :$project:prepareToPublishToS3 $PREPARE_TO_PUBLISH_T0_S3_PARAMS :$project:publish
done

echo "--- :android: Publishing WooCommerce Shared Library"

VERSION_TO_PUBLISH=`./gradlew -q :library:calculateVersionName $PREPARE_TO_PUBLISH_T0_S3_PARAMS`
# :demo:preBuild is necessary because React Native Gradle Plugin only works if a `com.android.application`
# module is part of the build. We don't need to build the demo app, so the `preBuild` task is enough for us
./gradlew -PwillPublishWooCommerceSharedLibrary=true -PreactNativeLibrariesPublishedVersion=$VERSION_TO_PUBLISH :demo:preBuild :library:prepareToPublishToS3 $PREPARE_TO_PUBLISH_T0_S3_PARAMS :library:publish

