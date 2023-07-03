import android.app.Activity
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.woocommerce.shared.library.AnalyticsBridge

internal class ReactNativeExitModule(
        reactContext: ReactApplicationContext,
        val activity: Activity,
) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "ExitModule"
    }

    @ReactMethod
    fun exit() {
        activity.finish()
    }
}