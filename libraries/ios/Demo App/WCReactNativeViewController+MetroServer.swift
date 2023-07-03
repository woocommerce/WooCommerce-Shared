import WooCommerceShared
import Foundation
import Network

struct DevServerURL {
    static func from(
        scheme: String = "http",
        hostname: String,
        port: UInt16 = 8081,
        path: String = "/index.bundle",
        queryItems: [URLQueryItem] = [URLQueryItem(name: "platform", value: "ios")]
    ) -> URL {
        var components = URLComponents()
        components.scheme = scheme
        components.host = hostname
        components.port = Int(port)
        components.path = path
        components.queryItems = queryItems

        guard let url = components.url else {
            preconditionFailure("Invalid Metro Server address")
        }

        return url
    }
}

class FakeAnalyticsProvider: WCRNAnalyticsProvider {
    func sendEvent(_ event: String) {
        print("Sending fake event: \(event)")
    }
}

extension WCReactNativeViewController {

    /// Returns a View Controller that allows running a simulator debug build that can connect to the metro server.
    ///
    ///
    static func forLocalDevelopment(onPort port: UInt16 = 8081) -> WCReactNativeViewController {
        WCReactNativeViewController(bundle: DevServerURL.from(hostname: "localhost", port: port),
                                    analyticsProvider: FakeAnalyticsProvider(),
                                    blogID: <#blogid#>,
                                    apiToken: <#token#>)
    }

    /// Create a View Controller that allows running an on-device debug build that can connect to the metro server.
    ///
    /// To use this, you'll need to find the IP address of your local development machine, then pass it to the `withServer` argument.
    static func forOnDeviceDevelopment(
        withServer ipAddress: IPv4Address,
        onPort port: UInt16 = 8081
    ) -> WCReactNativeViewController {
        WCReactNativeViewController(bundle: DevServerURL.from(hostname: ipAddress.debugDescription, port: port),
                                    analyticsProvider: FakeAnalyticsProvider(),
                                    blogID: <#blogid#>,
                                    apiToken: <#token#>)
    }
}

extension IPv4Address: ExpressibleByStringLiteral {

    /// Make it possible to initialize an IPv4Address using a regular 'ol string
    ///
    public init(stringLiteral value: StringLiteralType) {
        precondition(IPv4Address(value) != nil, "Invalid IP Address")
        self.init(value)!
    }
}
