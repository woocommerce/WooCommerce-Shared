import { Country, State } from "country-state-city";

/*
 * Returns the zone name for a country or region.
 * Returns an empty string for an unknown country, region or format.
 * Supported formats:
 * - {CountryCode}
 * - {CountryCode:RegionCode}
 * - {CountryCode:CountryCode-RegionCode}
 */
export function getZoneName(countryOrRegion: string) {
  const zoneComponents = countryOrRegion.split(":");

  // Handles the {CountryCode} format
  if (zoneComponents.length == 1) {
    const country = Country.getCountryByCode(zoneComponents[0]);
    return country?.name ?? "";
  }

  if (zoneComponents.length == 2) {
    const stateComponents = zoneComponents[1].split("-");

    // Handles de {CountryCode:RegionCode} format
    if (stateComponents.length == 1) {
      const state = State.getStateByCodeAndCountry(
        stateComponents[0],
        zoneComponents[0]
      );
      return state?.name ?? "";
    }

    // Handles the {CountryCode:CountryCode-RegionCode} format
    if (stateComponents.length == 2) {
      const state = State.getStateByCodeAndCountry(
        stateComponents[1],
        zoneComponents[0]
      );
      return state?.name ?? "";
    }
  }

  return "";
}
