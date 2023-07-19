# WooCommerce Shared

A React Native project used to share code between WooCommerce iOS and Android.

## Quickstart

### iOS – CocoaPods

#### Production Builds
```ruby
pod 'woocommerce-shared', '~> 0.0.1'
```

#### Development Builds
```ruby
# Reference a commit hash
pod 'WooCommerceShared', git: 'https://github.com/woocommerce/WooCommerce-Shared.git', commit: '6cba1e9'

# Reference a branch
pod 'WooCommerceShared', git: 'https://github.com/woocommerce/WooCommerce-Shared.git', branch: 'trunk'

# Reference a local copy
pod 'WooCommerceShared', path: '../WooCommerce-Shared'
```

### iOS – SwiftPM

#### Production Builds
```swift
dependencies: [
    .package(url: "https://github.com/woocommerce/woocommerce-shared.git", .upToNextMajor(from: "0.0.1"))
]
```

#### Development Builds
```swift
// Development Builds require two entries – one for the binary target:
targets: [
    .binaryTarget(
        name: "WooCommerceShared",
        url: "https://cdn.a8c-ci.services/woocommerce-shared/[commit-hash]/WooCommerceShared.xcframework.zip",
        checksum: "[Contents of https://cdn.a8c-ci.services/woocommerce-shared/[commit-hash]/WooCommerceShared.xcframework.zip.checksum.txt]"
    )

]
 
// And a second to make the target depend on it:
.executable(name: "MyApp", targets: [
	"WooCommerceShared",
])

```


## Development

This project uses `make` for most of its operations. You probably already have it installed if you've used your computer for development tasks in the past.

### Prerequisites

To work on this project, you'll need a JS runtime. The current JS version is in the repo's `.nvmrc` file, so if you have `nvm` installed, it'l just work. Otherwise, you'll need that version of `node` installed. If you're doing iOS development, you'll need Ruby installed – we recommend using `rbenv`, which will ensure that you're running the correct version of the tooling. Lastly, this project uses `yarn` as its package manager, so once you have `node` installed, you'll need to run `npm install -g yarn` to ensure the package manager is available everywhere.

### Setup

Run `make dev` to start working on this project locally.

## Build + Ship

Running `make` (with no other arguments) will build every component of the project (if possible on the current machine). See the `Makefile` for all of the individual build tasks involved in this.

## Releases

Because of various CocoaPods and SwiftPM idiosyncracies around `xcframework` distribution, releases are a bit tricky. To perform a release, you should:

1. Create a `release/$VERSION` branch.
2. Adjust the version numbers in `WooCommerceShared.podspec` and `package.json` to match your `$VERSION`, then commit your changes as `Bump version to $VERSION`, then push your changes to GitHub.com
3. Wait for CI to publish the tip of your release branch, and note the commit shorthash.
4. Update the URL in `Package.swift`, and update the `checksum` field with the hash printed in the build log (if you need it, it's also published to `https://cdn.a8c-ci.services/woocommerce-shared/{commit-hash}/WooCommerceShared.xcframework.zip.checksum.txt`.
5. Commit your change as `Tag {$VERSION}`, then tag that commit with your version number.
6. Publish the tag to GitHub.com
