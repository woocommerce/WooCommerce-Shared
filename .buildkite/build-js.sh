#!/bin/bash -eux

echo "--- :nodejs: Installing NVM"

export NVM_DIR="$HOME/.nvm"
mkdir -p "$NVM_DIR"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

NVM_SETUP_SCRIPT="$NVM_DIR/nvm.sh"

source "$NVM_SETUP_SCRIPT"

# Set up the .bashrc for any sub-shells
BASHRC="$HOME/.bashrc"
echo "export NVM_DIR='$NVM_DIR'" >> "$BASHRC"
echo "[ -s '$NVM_SETUP_SCRIPT' ] && \. '$NVM_SETUP_SCRIPT'" >> "$BASHRC"

echo "--- :nodejs: Installing Node"
nvm install

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
