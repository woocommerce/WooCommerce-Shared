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
            url: "https://cdn.a8c-ci.services/woocommerce-shared/3949394/WooCommerceShared.xcframework.zip",
            checksum: "488187cf54109693ad8d9905c9320e288f15e761fa8f858341bd3e345523c7aa"
        )
    ]
)
