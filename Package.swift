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
            url: "https://cdn.a8c-ci.services/woocommerce-shared/882a860/WooCommerceShared.xcframework.zip",
            checksum: "929edfc1484fbb7f5670fb2583de8c7e321f1bf7ec1381a0618828efb1419e05"
        )
    ]
)
