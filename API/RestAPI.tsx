import { WPComAPIVersion } from "./APIs";

/*
 * Utility function to create a rest request using hitting the site url directly.
 */
export async function restFetch(apiVersion: WPComAPIVersion, path: string) {
  const siteAddress = "https://blushing-panther.jurassic.ninja";
  const appPassword = "ZGVtbzpyOGc0IDVOb1kga1d0MSBvNzdaIFJoODkgM3ZyTw==";
  const url = `${siteAddress}/wp-json/${apiVersion}/${path}`;
  console.log(`-- About to fetch: ${url}`); // We can delete this but seems handy for the time being to seee what requests are being fired.

  return fetch(url, {
    headers: {
      Authorization: `Basic ${appPassword}`,
    },
  });
}
