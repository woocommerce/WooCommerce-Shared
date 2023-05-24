# frozen_string_literal: true

Pod::Spec.new do |s|
  s.name          = 'WooCommerceShared'
  s.version       = '0.0.1'

  s.summary       = 'Shared components used for the iOS and Android WooCommerce Apps.'
  s.description   = "#{s.summary} It's a React Native library project."

  s.homepage      = 'https://github.com/woocommerce/WooCommerce-Shared'
  s.license       = { type: 'MPL', file: 'LICENSE' }
  s.license       = { type: 'Copyright', text: File.read('LICENSE') }
  s.author        = { 'The WooCommerce Mobile Team' => 'mobile@wordpress.org' }

  s.platform      = :ios, '13.0'
  s.swift_version = '5.0'

  s.source = {
    http: 'https://cdn.a8c-ci.services/woocommerce-shared/6cba1e9/WooCommerceShared.xcframework.zip',
    sha1: '22a81b12c36d643d059e61f45a44101308a2b74c'
  }

  s.vendored_frameworks = 'WooCommerceShared.xcframework'
end
