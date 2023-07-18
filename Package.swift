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
            url: "https://cdn.a8c-ci.services/woocommerce-shared/6cba1e9/WooCommerceShared.xcframework.zip",
            checksum: "d815fb1b3a897e1a42c27c6ea1373ab25c818d3beaa4a73205390c6031768d1c"
        )
    ]
)
