#!/bin/bash -eu

echo "--- :nodejs: Installing NVM"

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

NVM_DIR="$HOME/.nvm"
NVM_SETUP_SCRIPT="$NVM_DIR/nvm.sh"
# See https://github.com/nvm-sh/nvm/issues/1985#issuecomment-813189002 for
# why we use the --install flag
source "$NVM_SETUP_SCRIPT" --install

echo "--- :nodejs: Installing Node"
nvm install

echo "+++ :bug: Debug info"
echo "Node version: $(node -v)"
# See https://bobbyhadz.com/blog/node-glibc-not-found-required-by-node
echo "GLIBC version: $(ldd --version)"

echo "+++ :up: Upgrade ldd"
sudo yum update
sudo yum install elfutils-libelf-devel
echo "GLIBC version: $(ldd --version)"

echo "--- :yarnpkg: Installing yarn"
npm install -g yarn

echo "--- :yarnpkg: Download JS Dependencies"

ARCHITECTURE=$(uname -m)
JS_VERSION=$(cat .nvmrc)
PACKAGE_LOCK_HASH=$(hash_file yarn.lock)
CACHEKEY="$BUILDKITE_PIPELINE_SLUG-$ARCHITECTURE-js$JS_VERSION-$PACKAGE_LOCK_HASH"

restore_cache "$CACHEKEY"
yarn install
save_cache node_modules "$CACHEKEY"

echo "--- :hammer: Building"
make bundle
