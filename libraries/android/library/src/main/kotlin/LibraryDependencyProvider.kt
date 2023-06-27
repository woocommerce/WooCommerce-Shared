package com.woocommerce.shared.library

interface LibraryDependencyProvider {
    fun provideAnalyticsBridge(): AnalyticsBridge
}
