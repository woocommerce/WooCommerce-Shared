package com.woocommerce.shared.demo

import android.app.Application
import android.util.Log
import com.woocommerce.shared.library.AnalyticsBridge
import com.woocommerce.shared.library.LibraryDependencyProvider

class DemoApplication : Application(), LibraryDependencyProvider {
    override fun provideAnalyticsBridge(): AnalyticsBridge {
        return object : AnalyticsBridge {
            override fun sendEvent(event: String) {
                Log.d("Tracks", "Sending fake event: $event")
            }
        }
    }
}
