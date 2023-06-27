package com.woocommerce.shared.library

interface AnalyticsBridge {
    fun sendEvent(event: String)
}