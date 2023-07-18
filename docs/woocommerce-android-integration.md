This project is integrated to `WooCommerce-Android` project in two different ways:

### Binary Dependency

This is the default integration and works like any other Android dependency. We bundle the Android JS file, package it within the `library` module and publish it to S3. `WooCommerce-Android` is then able to add this dependency with `com.woocommerce.shared:library:$version` and access the `com.woocommerce.shared.library.ReactActivity`.

Since binary dependency works with a packaged JS bundle, it's not possible to use the Metro server or change the contents of the JS file with this method.

### Included Build

This integration uses Gradle's [composite builds feature](https://docs.gradle.org/current/userguide/composite_builds.html) and is only available in local environment for testing purposes. To enable this feature from `WooCommerce-Android`:

* Open your `WooCommerce-Android` local folder in your terminal
* Copy the `local-builds.gradle-example` file as `local-builds.gradle`: `cp local-builds.gradle-example local-builds.gradle`
* In `local-builds.gradle` file, uncomment the `localWooCommerceSharedPath` property and make sure it has the correct path for the `WooCommerce-Shared` project path. Note that, since the android project is not at the root of `WooCommerce-Shared` project, it's important to keep the `/libraries/android` suffix in the path.

Once these steps are complete, when you build the `WooCommerce-Android` project, you'll be building the `WooCommerce-Shared` project as part of it. If you open the `WooCommerce-Android` project in Android Studio, `WooCommerce-Shared` project will also be available, so you can work on them together. If you don't see the `WooCommerce-Shared` project in Android Studio, make sure to run Gradle Sync from Android Studio.

**Using Metro Server**

`react-native` defaults to using the Metro server, so to use it, you just need to run it from the root of `WooCommerce-Shared` project with `make dev`.

**Using Bundled JS file**

Using Bundled JS file is usually reserved to publishing the library and adding it as a [Binary Dependency](#Binary-Dependency). However, there might be cases that requires verifying that the bundled JS file works as expected from the local environment. Here are the steps to get this working:

* Make sure the metro server is NOT running. This is important because `react-native` defaults to using the Metro server.
* Open your `WooCommerce-Shared` local folder in your terminal
* Bundle the Android JS file with: `make bundle-android`
* Copy the bundled JS file to the assets folder of Android library with `mkdir -p libraries/android/library/build/assets/ && cp dist/bundles/bundle-android.js libraries/android/library/build/assets/index.android.bundle`
* Build & run the `WooCommerce-Android` project

