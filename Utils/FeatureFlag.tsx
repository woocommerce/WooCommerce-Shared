/*
 * Local feature flag definition.
 * Useful to hide development code from the production one.
 * __DEV__ is true when running against the metro server.
 */

export enum LocalFeatureFlag {
  addShippingZones,
}

export function isFeatureEnabled(feature: LocalFeatureFlag) {
  switch (feature) {
    case LocalFeatureFlag.addShippingZones:
      return __DEV__ === true;
    default:
      throw new Error(`No value for feature: ${feature}`);
  }
}
