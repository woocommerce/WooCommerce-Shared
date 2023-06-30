package com.woocommerce.shared.library

import android.content.Context
import com.facebook.flipper.android.AndroidFlipperClient
import com.facebook.flipper.plugins.network.FlipperOkhttpInterceptor
import com.facebook.flipper.plugins.network.NetworkFlipperPlugin
import com.facebook.react.modules.network.NetworkingModule

object SetupBuildSpecificDependencies {

    operator fun invoke(context: Context) {
        val flipperInstance =
            AndroidFlipperClient.getInstanceIfInitialized() ?: AndroidFlipperClient.getInstance(
                context
            ).apply {
                addPlugin(NetworkFlipperPlugin())
                start()
            }

        NetworkingModule.setCustomClientBuilder { builder ->
            builder.addNetworkInterceptor(
                FlipperOkhttpInterceptor(
                    flipperInstance.getPlugin(NetworkFlipperPlugin.ID)
                )
            )
        }
    }
}
