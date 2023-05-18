#!/bin/bash -eu

echo "--- :nodejs: Installing NVM"

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

NVM_DIR="$HOME/.nvm"
NVM_SETUP_SCRIPT="$NVM_DIR/nvm.sh"

# Set up the .bashrc for any sub-shells
#
# This is not the standard way of doing it, see
# https://github.com/nvm-sh/nvm/issues/1985#issuecomment-813189002
BASHRC="$HOME/.bashrc"
echo "export NVM_DIR='$NVM_DIR'" >> "$BASHRC"
echo "[ -s '$NVM_SETUP_SCRIPT' ] && \. '$NVM_SETUP_SCRIPT' --install" >> "$BASHRC"

# Unset the unbound var failure because there might be unbounds in the rc.
#
# See how CI fails here:
# https://buildkite.com/automattic/woocommerce-shared/builds/89#01882eb5-9a3f-42c4-9849-1d46ae5b3e29/162-185
set +u
source "$BASHRC"
set -u

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
