import WooCommerceShared

extension WCReactNativeViewController {
    static func forLocalDevelopment(onPort port: UInt16 = 8081) -> WCReactNativeViewController {
        let url = URL(string: "http://localhost:\(port)/index.bundle?platform=ios")!
        return WCReactNativeViewController(bundle: url)
    }
}
