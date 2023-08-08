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
            url: "https://cdn.a8c-ci.services/woocommerce-shared/d6930c5/WooCommerceShared.xcframework.zip",
            checksum: "11744518e157521a3a95ee5302302a68ab4b2f95c3cedec132831f7cada4b88e"
        )
    ]
)
