package com.woocommerce.shared.library

import android.app.Activity
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.facebook.react.PackageList
import com.facebook.react.ReactInstanceManager
import com.facebook.react.ReactPackage
import com.facebook.react.ReactRootView
import com.facebook.react.common.LifecycleState
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler
import com.facebook.soloader.SoLoader

class ReactActivity : AppCompatActivity(), DefaultHardwareBackBtnHandler {
    private lateinit var reactRootView: ReactRootView
    private lateinit var reactInstanceManager: ReactInstanceManager

    companion object{
        const val PROPERTY_BLOG_ID = "blogId"
        const val PROPERTY_TOKEN = "token"
        const val PROPERTY_SITE_URL = "siteUrl"
        const val PROPERTY_APP_PASSWORD = "appPassword"
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        SoLoader.init(this, false)
        reactRootView = ReactRootView(this)

        val packages: List<ReactPackage> = PackageList(application).packages

        SetupBuildSpecificDependencies(application)
        // Packages that cannot be autolinked yet can be added manually here, for example:
        // packages.add(MyReactNativePackage())
        // Remember to include them in `settings.gradle` and `app/build.gradle` too.
        reactInstanceManager = ReactInstanceManager.builder()
            .setApplication(application)
            .setCurrentActivity(this)
            .setBundleAssetName("index.android.bundle")
            .setJSMainModulePath("index.tsx")
            .addPackages(packages)
            .setUseDeveloperSupport(BuildConfig.DEBUG)
            .setInitialLifecycleState(LifecycleState.RESUMED)
            .build()
        // The string here (e.g. "MyReactNativeApp") has to match
        // the string in AppRegistry.registerComponent() in index.ts
        val token = intent.getStringExtra(PROPERTY_TOKEN)
        val blogId = intent.getStringExtra(PROPERTY_BLOG_ID)
        val siteURL = intent.getStringExtra(PROPERTY_SITE_URL)
        val appPassword = intent.getStringExtra(PROPERTY_APP_PASSWORD)
        val initialProperties = Bundle().apply {
            putString(PROPERTY_TOKEN, token)
            putString(PROPERTY_BLOG_ID, blogId)
            putString(PROPERTY_SITE_URL, siteURL)
            putString(PROPERTY_APP_PASSWORD, appPassword)
        }
        reactRootView.startReactApplication(reactInstanceManager, "main", initialProperties)
        setContentView(reactRootView)
    }

    override fun invokeDefaultOnBackPressed() {
        super.onBackPressed()
    }

    override fun onPause() {
        super.onPause()
        reactInstanceManager.onHostPause(this)
    }

    override fun onResume() {
        super.onResume()
        reactInstanceManager.onHostResume(this, this)
    }

    override fun onDestroy() {
        super.onDestroy()
        reactInstanceManager.onHostDestroy(this)
        reactRootView.unmountReactApplication()
    }

    override fun onBackPressed() {
        reactInstanceManager.onBackPressed()
        super.onBackPressed()
    }
}
