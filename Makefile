SHELL := /bin/bash -eo pipefail

#######
# Build Tasks
#######

# Make `all` the default task when running `make`, and include every task needed to fully build the project
#
# This may not be possible on non-Macs (because there are Xcode requirements), so it's mostly just useful locally.
.PHONY: all
all: yarn gems pods bundle xcframework

# Install JS dependencies
#
yarn:
	yarn

# Build production JS bundles
#
bundle: bundle-ios bundle-android

bundle-ios:
	mkdir -p dist/bundles
	yarn react-native bundle --platform ios --bundle-output dist/bundles/bundle-ios.js --dev false --entry-file index.js

bundle-android:
	mkdir -p dist/bundles
	yarn react-native bundle --platform android --bundle-output dist/bundles/bundle-android.js --dev false --entry-file index.js

bundle-ci:
	mkdir -p dist/bundles
	docker run --rm -v $(shell pwd):/app -w /app node:18.16.0 yarn

# Install Ruby Gems needed for iOS (and publishing)
#
gems: bundle
	bundle install

# Install CocoaPods needed for iOS
#
pods: gems
	bundle exec pod install --project-directory=libraries/ios

# Build an XCFramework of this project – this is the primary distribution artifact for iOS
#
xcframework:
	mkdir -p dist
	@echo "--- Creating iOS Framework"

	xcodebuild archive \
	-workspace libraries/ios/WooCommerceShared.xcworkspace \
	-scheme "WooCommerceShared" \
	-configuration Release \
    -destination "generic/platform=iOS" \
	-archivePath dist/ios-platform \
	| xcbeautify

	@echo "--- Creating iOS Simulator Framework"

	xcodebuild archive \
	-workspace libraries/ios/WooCommerceShared.xcworkspace \
	-scheme "WooCommerceShared" \
	-configuration Release \
    -destination "generic/platform=iOS Simulator" \
	-archivePath dist/ios-simulator \
	| xcbeautify

	@echo "--- Compiling XCFramework"
	rm -rf dist/WooCommerceShared.xcframework
	xcodebuild -create-xcframework \
	    -framework dist/ios-platform.xcarchive/Products/Library/Frameworks/WooCommerceShared.framework -debug-symbols $(shell pwd)/dist/ios-platform.xcarchive/dSYMs/WooCommerceShared.framework.dSYM \
	    -framework dist/ios-simulator.xcarchive/Products/Library/Frameworks/WooCommerceShared.framework -debug-symbols $(shell pwd)/dist/ios-simulator.xcarchive/dSYMs/WooCommerceShared.framework.dSYM \
	    -output dist/WooCommerceShared.xcframework

# Remove all downloaded dependencies and compiled code
#
clean:
	git clean -fdX
	rm -rfv ~/Library/Developer/Xcode/DerivedData/WooCommerceShared*

####
# Utilities
####

# Lint Podfile (and other Ruby files)
#
lint-ruby:
	@echo "--- Linting..."
	docker run --rm -v $(shell pwd):/app -w /app ruby:2.7.4 bash -c 'bundle install && bundle exec rubocop'

# Auto-correct Podfile syntax (and other Ruby files)
#
lint-ruby-fix:
	@echo "--- Auto-correectlint lint issues..."
	docker run --rm -v $(shell pwd):/app -w /app ruby:2.7.4 bash -c 'bundle install && bundle exec rubocop -A'

# Start local React Native development
#
dev: yarn
	yarn react-native start

# Start local iOS development
#
xcode:
	xed 'libraries/ios'
