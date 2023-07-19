import { WPComAPIVersion } from "./APIs";

/*
 * Utility function to create a rest request using hitting the site url directly.
 */
export async function restFetch(
  apiVersion: WPComAPIVersion,
  path: string,
  siteUrl: string,
  appPassword: string
) {
  const url = `${siteUrl}/wp-json/${apiVersion}/${path}`;
  console.log(`-- About to fetch: ${url}`); // We can delete this but seems handy for the time being to seee what requests are being fired.

  return fetch(url, {
    credentials: "omit", // Do not send any credential cookies left by the apps on the browser.
    headers: {
      Authorization: `Basic ${appPassword}`,
    },
  });
}
