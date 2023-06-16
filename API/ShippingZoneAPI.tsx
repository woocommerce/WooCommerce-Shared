import { WPComAPIVersion } from "./APIs";
import { jetpackFetch } from "./JetpackAPI";

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
export async function fetchShippingZones(blogId: string, token: string) {
  try {
    const response = await jetpackFetch(
      WPComAPIVersion.wcV3,
      "shipping/zones",
      blogId,
      token
    );

    const json = await response.json();
    const zones: ShippingZone[] = await Promise.all(
      json.data.map(async (obj) => {
        return {
          id: obj.id,
          title: obj.name,
          locations: await fetchShippingZoneLocations(obj.id, blogId, token),
          methods: await fetchShippingZoneMethods(obj.id, blogId, token),
        };
      })
    );

    return zones;
  } catch (error) {
    console.error(error);
    return [];
  }
}

/*
 * Fetches shipping zones locations for a given zone id, using the WPCom API.
 */
export async function fetchShippingZoneLocations(
  zoneID: number,
  blogId: string,
  token: string
) {
  try {
    let path = `shipping/zones/${zoneID}/locations`;
    const response = await jetpackFetch(
      WPComAPIVersion.wcV3,
      path,
      blogId,
      token
    );

    const json = await response.json();
    const locations: ShippingZoneLocation[] = json.data.map((obj) => {
      return {
        code: obj.code,
        type: obj.type,
      };
    });

    return locations;
  } catch (error) {
    console.error(error);
    return [];
  }
}

/*
 * Fetches shipping zones methods for a given zone id, using the WPCom API.
 */
export async function fetchShippingZoneMethods(
  zoneID: number,
  blogId: string,
  token: string
) {
  try {
    let path = `shipping/zones/${zoneID}/methods`;
    const response = await jetpackFetch(
      WPComAPIVersion.wcV3,
      path,
      blogId,
      token
    );

    const json = await response.json();
    const methods: ShippingZoneMethod[] = json.data.map((obj) => {
      return {
        id: obj.method_id,
        title: obj.method_title,
        description: obj.method_description,
      };
    });

    return methods;
  } catch (error) {
    console.error(error);
    return [];
  }
}
