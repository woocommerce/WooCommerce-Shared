#!/bin/bash -eu

echo '--- :yarn: Restore yarn cache, if any'
ARCHITECTURE=$(uname -m)
JS_VERSION=$(cat .nvmrc)
PACKAGE_LOCK_HASH=$(hash_file yarn.lock)
CACHEKEY="$BUILDKITE_PIPELINE_SLUG-$ARCHITECTURE-js$JS_VERSION-$PACKAGE_LOCK_HASH"

restore_cache "$CACHEKEY"

echo '--- :react: Generate JS bundles'
make bundle-ci

echo '--- :yarn: Upload yarn cache'
save_cache node_modules "$CACHEKEY"
