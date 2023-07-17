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
            url: "https://cdn.a8c-ci.services/woocommerce-shared/41673dc/WooCommerceShared.xcframework.zip",
            checksum: "df22d6978ccfb3b97e213508031de9721ac86068a5dbce685d4aecb6b0fb0eaa"
        )
    ]
)
