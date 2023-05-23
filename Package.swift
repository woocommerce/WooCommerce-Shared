// swift-tools-version:5.3
import PackageDescription

let package = Package(
    name: "WooCommerceShared",
    platforms: [
       .iOS(.v13),
    ],
    products: [
        // Products define the executables and libraries a package produces, and make them visible to other packages.
        .library(
            name: "WooCommerceShared",
            targets: ["WooCommerceShared"])
    ],
    dependencies: [
        // Dependencies declare other packages that this package depends on.
    ],
    targets: [
        .binaryTarget(
            name: "WooCommerceShared",
            url: "https://d2twmm2nzpx3bg.cloudfront.net/woocommerce-shared/64b5ca9/WooCommerceShared.xcframework.tar.gz",
            checksum: "aasdfasdfasdfasdfasdf"
        )
    ]
)
