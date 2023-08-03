import { WPComAPIVersion } from "./APIs";
import { Method } from "./Method";

/*
 * Utility function to create a WPCom request using the `jetpack-blogs` tunnel.
 */
export async function jetpackFetch(
  method: Method,
  apiVersion: WPComAPIVersion,
  path: string,
  blogId: string,
  apiToken: string,
  body: string
) {
  const baseUrl = "https://public-api.wordpress.com/rest/v1.1/jetpack-blogs";
  const apiPath = `/${blogId}/rest-api/`;

  let optionalPath = "";
  if (method == Method.GET) {
    optionalPath = `?path=/${apiVersion}/${path}`;
  }

  const url = `${baseUrl}${apiPath}${optionalPath}`;

  console.log(`-- About to fetch: ${url}`); // We can delete this but seems handy for the time being to seee what requests are being fired.

  let bodyWrapper = JSON.stringify({
    path: `${apiVersion}/${path}`,
    json: true,
    body: body,
  });

  return fetch(url, {
    method: method,
    headers: {
      Authorization: `Bearer ${apiToken}`,
      "Content-Type": "application/json",
    },
    ...(body && { body: bodyWrapper }),
  });
}
