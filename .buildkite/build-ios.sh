 echo "--- :nodejs: Installing NVM"
 brew install nvm --verbose
 export NVM_DIR="/usr/local/opt/nvm"
 source /usr/local/opt/nvm/nvm.sh --no-use

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
 make xcframework
