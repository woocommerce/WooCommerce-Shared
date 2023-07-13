#!/bin/bash -e

# Make Homebrew run a bit faster
export HOMEBREW_NO_AUTO_UPDATE=1
export HOMEBREW_NO_INSTALL_CLEANUP=1

echo "--- :nodejs: Installing NVM"
brew install nvm --verbose
# Brew installs NVM in its default location but at some point our setup expects it in the recommended location in $HOME.
# So, let's put it there.
#
# Notice the $HOMEBREW_PREFIX usage to make the script chipset-agnostic.
NVM_DIR_IN_HOMEBREW="$HOMEBREW_PREFIX/opt/nvm"
NVM_DIR_IN_HOME="$HOME/.nvm"
mkdir -p "$NVM_DIR_IN_HOME"
export NVM_DIR="$NVM_DIR_IN_HOME"
source "$NVM_DIR_IN_HOMEBREW/nvm.sh" --no-use

# Set up the .bashrc for any sub-shells
BASHRC="$HOME/.bashrc"
echo "export NVM_DIR='$NVM_DIR'" >> "$BASHRC"
echo "[ -s '$NVM_DIR_IN_HOMEBREW/nvm.sh' ] && \. '$NVM_DIR_IN_HOMEBREW/nvm.sh'" >> "$BASHRC"

echo "--- :nodejs: Installing Node"
nvm install

echo "--- :rubygems: Download Gems"
install_gems

echo "--- :yarnpkg: Installing yarn"
npm install -g yarn

echo "--- :yarnpkg: Download JS Dependencies"

ARCHITECTURE=$(uname -m)
JS_VERSION=$(cat .nvmrc)
PACKAGE_LOCK_HASH=$(hash_file yarn.lock)
CACHEKEY="$BUILDKITE_PIPELINE_SLUG-$ARCHITECTURE-js$JS_VERSION-$PACKAGE_LOCK_HASH"

restore_cache "$CACHEKEY"
yarn install

# If this is the first time we've seen this particular cache key, save it for the future
save_cache node_modules "$CACHEKEY"

echo "--- :cocoapods: Download CocoaPods Dependencies"
pushd libraries/ios
install_cocoapods
popd

echo "--- :xcode: Installing xcbeautify"
brew install xcbeautify

echo "--- :xcode: Building"
make bundle-ios xcframework

echo "--- :amazon-s3: Uploading ZIP archive"
GIT_HASH=$(git rev-parse HEAD)
aws s3 cp dist/WooCommerceShared.xcframework.zip "s3://a8c-apps-public-artifacts/woocommerce-shared/${GIT_HASH}/WooCommerceShared.xcframework.zip"

echo "--- 🧮 Hashing"
ZIP_HASH=$(swift package compute-checksum dist/WooCommerceShared.xcframework.zip)
echo "$ZIP_HASH" | tee dist/WooCommerceShared.xcframework.zip.checksum.txt
aws s3 cp dist/WooCommerceShared.xcframework.zip.checksum.txt "s3://a8c-apps-public-artifacts/woocommerce-shared/${GIT_HASH}/WooCommerceShared.xcframework.zip.checksum.txt"

echo "--- :amazon-s3: Uploading podspec"
make generate_podspec
aws s3 cp WooCommerceShared.podspec "s3://a8c-apps-public-artifacts/woocommerce-shared/${GIT_HASH}/WooCommerceShared.podspec"
