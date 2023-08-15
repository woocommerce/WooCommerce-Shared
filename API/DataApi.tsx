import { APIError, apiFetch, normalizeJSON, WPComAPIVersion } from "./APIs";
import { Method } from "./Method";
import { getCountryByCode } from "../Utils/Country";

abstract class Region {
  name: string;
  code: string;

  protected constructor(name: string, code: string) {
    this.name = name;
    this.code = code;
  }
}

export class State extends Region {
  constructor(name: string, code: string) {
    super(name, code);
  }
}

export class Country extends Region {
  states: State[];

  constructor(code: string, states: State[]) {
    // BUG #31853: API returns names of countries' currencies instead of the names of countries
    // https://github.com/woocommerce/woocommerce/issues/31853
    super(getCountryByCode(code).name, code);
    this.states = states;
  }
}

class Continent extends Region {
  countries: Country[];

  constructor(name: string, code: string, countries: Country[]) {
    super(name, code);
    this.countries = countries;
  }
}

export async function getRegions(): Promise<Continent[]> {
  const path = "data/continents";
  const response = await apiFetch(Method.GET, WPComAPIVersion.wcV3, path);
  const json = await response.json();

  if (!response.ok) {
    throw new APIError(path, response.status, json);
  }

  return normalizeJSON(json).map((obj) => {
    return new Continent(
      obj.name,
      obj.code,
      obj.countries.map((countryJson) => {
        return new Country(
          countryJson.code,
          countryJson.states.map((stateJson) => {
            return new State(stateJson.name, stateJson.code);
          })
        );
      })
    );
  });
}
