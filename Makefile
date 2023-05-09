.PHONY: all

all: yarn bundle pods build xcframework

clean:
	git clean -fdX
	rm -rfv ~/Library/Developer/Xcode/DerivedData/WooCommerceShared*

yarn:
	yarn

dev: yarn
	yarn react-native start

build: yarn
	mkdir -p dist/bundles
	yarn react-native bundle --platform ios --bundle-output dist/bundles/bundle-ios.js --dev false --entry-file index.js
	yarn react-native bundle --platform android --bundle-output dist/bundles/bundle-android.js --dev false --entry-file index.js

# iOS Tasks
xcode:
	xed 'libraries/ios'

bundle:
	bundle install

pods: bundle
	bundle exec pod install --project-directory=libraries/ios

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
