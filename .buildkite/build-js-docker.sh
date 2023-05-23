#!/bin/bash -eu

echo '--- :s3: Setup environment for S3'
# Get a temporary session token which will be passed to the Docker container
sts_token=$(aws sts get-session-token)
key_id=$(echo "$sts_token" | jq -r .Credentials.AccessKeyId)
access_key=$(echo "$sts_token" | jq -r .Credentials.SecretAccessKey)
session_token=$(echo "$sts_token" | jq -r .Credentials.SessionToken)

export AWS_ACCESS_KEY_ID="$key_id"
export AWS_SECRET_ACCESS_KEY="$access_key"
export AWS_SESSION_TOKEN="$session_token"

echo '--- :yarn: Restore yarn cache, if any'
ARCHITECTURE=$(uname -m)
JS_VERSION=$(cat .nvmrc)
PACKAGE_LOCK_HASH=$(hash_file yarn.lock)
CACHEKEY="$BUILDKITE_PIPELINE_SLUG-$ARCHITECTURE-js$JS_VERSION-$PACKAGE_LOCK_HASH"

restore_cache "$CACHEKEY"

echo '--- :react: Generate JS bundles'
make bundle-ci

echo '--- :yarn: Upload yarn cache'
restore_cache node_modules "$CACHEKEY"
