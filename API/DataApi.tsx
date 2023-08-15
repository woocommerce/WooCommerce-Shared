import { APIError, apiFetch, normalizeJSON, WPComAPIVersion } from "./APIs";
import { Method } from "./Method";
import { getCountryByCode } from "../Utils/Country";

export abstract class Region {
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

  constructor(name: string, code: string, states: State[]) {
    super(name, code);
    this.states = states;
  }
}

export class Continent extends Region {
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
        // BUG #31853: API returns names of countries' currencies instead of the names of countries
        // https://github.com/woocommerce/woocommerce/issues/31853
        const countryName = getCountryByCode(countryJson.code).name;
        return new Country(
          countryName,
          countryJson.code,
          countryJson.states.map((stateJson) => {
            return new State(
              `${stateJson.name}, ${countryName}`,
              stateJson.code
            );
          })
        );
      })
    );
  });
}
