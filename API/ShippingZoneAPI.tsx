import { getZoneName } from "../Utils/Country";
import { APIError, WPComAPIVersion, apiFetch, normalizeJSON } from "./APIs";

/*
 * ShippingZone API defition
 */
export type ShippingZone = {
  id: number;
  title: string;
  locations: ShippingZoneLocation[];
  methods: ShippingZoneMethod[];
};

/*
 * ShippingZoneLocation API defition
 */
export type ShippingZoneLocation = {
  code: string;
  name: string;
  type: string;
};

/*
 * ShippingZoneMethod API defition
 */
export type ShippingZoneMethod = {
  id: number;
  title: string;
  description: string;
};

/*
 * Fetches shipping zones using the WPCom API.
 * Internally fetches the necessary locations and methods too as they live in a separate API.
 */
export async function fetchShippingZones() {
  try {
    const path = "shipping/zones";
    const response = await apiFetch(WPComAPIVersion.wcV3, path);
    const json = await response.json();

    if (!response.ok) {
      throw new APIError(path, response.status, json);
    }

    const zones: ShippingZone[] = await Promise.all(
      normalizeJSON(json).map(async (obj) => {
        return {
          id: obj.id,
          title: obj.name,
          locations: await fetchShippingZoneLocations(obj.id),
          methods: await fetchShippingZoneMethods(obj.id),
        };
      })
    );

    return zones;
  } catch (error) {
    throw error;
  }
}

/*
 * Fetches shipping zones locations for a given zone id, using the WPCom API.
 */
export async function fetchShippingZoneLocations(zoneID: number) {
  try {
    let path = `shipping/zones/${zoneID}/locations`;
    const response = await apiFetch(WPComAPIVersion.wcV3, path);
    const json = await response.json();

    if (!response.ok) {
      throw new APIError(path, response.status, json);
    }

    const locations: ShippingZoneLocation[] = normalizeJSON(json).map((obj) => {
      return {
        code: obj.code,
        name: getZoneName(obj.code),
        type: obj.type,
      };
    });

    return locations;
  } catch (error) {
    throw error;
  }
}

/*
 * Fetches shipping zones methods for a given zone id, using the WPCom API.
 */
export async function fetchShippingZoneMethods(zoneID: number) {
  try {
    let path = `shipping/zones/${zoneID}/methods`;
    const response = await apiFetch(WPComAPIVersion.wcV3, path);
    const json = await response.json();

    if (!response.ok) {
      throw new APIError(path, response.status, json);
    }

    const methods: ShippingZoneMethod[] = normalizeJSON(json).map((obj) => {
      return {
        id: obj.method_id,
        title: obj.method_title,
        description: obj.method_description,
      };
    });

    return methods;
  } catch (error) {
    throw error;
  }
}
