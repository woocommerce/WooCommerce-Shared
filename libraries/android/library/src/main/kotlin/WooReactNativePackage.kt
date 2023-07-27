import android.app.Activity
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import com.woocommerce.shared.library.AnalyticsBridge

class WooReactNativePackage(
        private val analyticsBridge: AnalyticsBridge,
        private val activity: Activity,
) : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return listOf(
                ReactNativeAnalyticsModule(reactContext, analyticsBridge),
                ReactNativeExitModule(reactContext, activity)
        )
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return emptyList()
    }
}