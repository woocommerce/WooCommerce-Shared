# frozen_string_literal: true

# This podspec is code generated base on the podspec.erb template.
# To make changes, please edit the template.

Pod::Spec.new do |s|
  s.name          = 'WooCommerceShared'
  s.version       = '0.0.1'

  s.summary       = 'Shared components used for the iOS and Android WooCommerce Apps.'
  s.description   = "#{s.summary} It's a React Native library project."

  s.homepage      = 'https://github.com/woocommerce/WooCommerce-Shared'
  # s.license       = { type: 'MPL', text: File.read('LICENSE') }
  s.author        = { 'The WooCommerce Mobile Team' => 'mobile@wordpress.org' }

  s.platform      = :ios, '13.0'
  s.swift_version = '5.0'

  s.source_files = 'WooCommerceShared.xcframework'

  s.source = {
    http: "https://cdn.a8c-ci.services/woocommerce-shared/4fb76dee105bfaf89d2671de73f8e7a52581b12d/WooCommerceShared.xcframework.zip"
  }

  s.vendored_frameworks = 'WooCommerceShared.xcframework'
end
