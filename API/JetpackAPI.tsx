import { WPComAPIVersion } from "./APIs";

/*
 * Utility function to create a WPCom request using the `jetpack-blogs` tunnel.
 *
 */
export async function jetpackFetch(
  apiVersion: WPComAPIVersion,
  path: string,
  blogId: string,
  token: string
) {
  const url = `https://public-api.wordpress.com/rest/v1.1/jetpack-blogs/${blogId}/rest-api/?path=/${apiVersion}/${path}`;
  console.log(`-- About to fetch: ${url}`); // We can delete this but seems handy for the time being to seee what requests are being fired.

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
