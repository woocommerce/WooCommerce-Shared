import { WPComAPIVersion } from "./APIs";
import { Method } from "./Method";

/*
 * Utility function to create a rest request using hitting the site url directly.
 */
export async function restFetch(
  method: Method,
  apiVersion: WPComAPIVersion,
  path: string,
  siteUrl: string,
  appPassword: string,
  body: string
) {
  const url = `${siteUrl}/wp-json/${apiVersion}/${path}`;
  console.log(`-- About to fetch: ${url}`); // We can delete this but seems handy for the time being to seee what requests are being fired.

  return fetch(url, {
    method: method,
    credentials: "omit", // Do not send any credential cookies left by the apps on the browser.
    headers: {
      Authorization: `Basic ${appPassword}`,
      "Content-Type": "application/json",
    },
    ...(body && { body: body }),
  });
}
