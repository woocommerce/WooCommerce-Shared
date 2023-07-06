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
	yarn install

# Build production JS bundles
#
bundle: yarn bundle-ios bundle-android

bundle-ios:
	mkdir -p dist/bundles
	yarn react-native bundle --platform ios --bundle-output dist/bundles/bundle-ios.js --dev false --entry-file index.tsx

bundle-android:
	mkdir -p dist/bundles
	yarn react-native bundle --platform android --bundle-output dist/bundles/bundle-android.js --dev false --entry-file index.tsx

bundle-ci:
	# Notice we're using the AWS Public ECR image to avoid being rate limited by Docker Hub.
	docker run \
		--rm \
		--volume $(shell pwd):/app \
		--workdir /app \
		public.ecr.aws/docker/library/node:$(shell sed -e 's/v//' < .nvmrc) \
		make bundle

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
	mkdir -p dist logs
	@echo "--- :xcode: Creating iOS Framework"

	xcodebuild archive \
		-workspace libraries/ios/WooCommerceShared.xcworkspace \
		-scheme "WooCommerceShared" \
		-configuration Release \
		-destination "generic/platform=iOS" \
		-archivePath dist/ios-platform \
		-verbose \
		| tee logs/ios-platform-build.log \
		| xcbeautify

	@echo "--- :xcode: Creating iOS Simulator Framework"

	xcodebuild archive \
		-workspace libraries/ios/WooCommerceShared.xcworkspace \
		-scheme "WooCommerceShared" \
		-configuration Release \
		-destination "generic/platform=iOS Simulator" \
		-archivePath dist/ios-simulator \
		-verbose \
		| tee logs/ios-simulator-build.log \
		| xcbeautify

	@echo "--- :package: Compiling XCFramework"

	rm -rf dist/WooCommerceShared.xcframework
	xcodebuild -create-xcframework \
		-framework dist/ios-platform.xcarchive/Products/Library/Frameworks/WooCommerceShared.framework -debug-symbols $(shell pwd)/dist/ios-platform.xcarchive/dSYMs/WooCommerceShared.framework.dSYM \
		-framework dist/ios-simulator.xcarchive/Products/Library/Frameworks/WooCommerceShared.framework -debug-symbols $(shell pwd)/dist/ios-simulator.xcarchive/dSYMs/WooCommerceShared.framework.dSYM \
		-output dist/WooCommerceShared.xcframework

	@echo "--- :compression: Packaging XCFramework"

	rm -rf dist/WooCommerceShared.xcframework.tar.gz
	tar -czf dist/WooCommerceShared.xcframework.tar.gz -C dist/ WooCommerceShared.xcframework

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
dev: yarn pods
	yarn react-native start

# Start local iOS development
#
xcode:
	xed 'libraries/ios'
