import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.woocommerce.shared.library.AnalyticsBridge

class ReactNativeAnalyticsModule(
    reactContext: ReactApplicationContext,
    private val analyticsBridge: AnalyticsBridge,
) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "AnalyticsModule"
    }

    @ReactMethod
    fun sendEvent(event: String) {
        analyticsBridge.sendEvent(event)
    }
}