import countries from "./country-states.json";

/*
 * Returns the zone name for a country or state.
 * Returns an empty string for an unknown country or state.
 * Supported formats:
 * - {CountryCode}
 * - {CountryCode:StateCode}
 */
export function getZoneName(countryOrRegion: string) {
  const zoneComponents = countryOrRegion.split(":");

  // Handles the {CountryCode} format
  if (zoneComponents.length == 1) {
    const country = getCountryByCode(zoneComponents[0]);
    if (country == null) {
      return countryOrRegion;
    } else {
      return country.name;
    }
  }

  // Handles de {CountryCode:StateCode} format
  if (zoneComponents.length == 2) {
    const country = getCountryByCode(zoneComponents[0]);
    const state = getStateByCode(country, zoneComponents[1]);
    if (state == null) {
      return countryOrRegion;
    } else {
      return state.name;
    }
  }

  return countryOrRegion;
}

/*
 * Finds a country from the list of countries using a country code.
 */
function getCountryByCode(countryCode: string): any {
  return countries.find((country: any) => country.code === countryCode);
}

/*
 * Finds a state from the list of states of a country using a state code.
 */
function getStateByCode(country: any, stateCode: string): any {
  return country.states.find((state: any) => state.code === stateCode);
}
