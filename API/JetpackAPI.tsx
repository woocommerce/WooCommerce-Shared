import { Dependency, readDependency } from "../Storage/AppDependencies";
import { WPComAPIVersion } from "./APIs";

/*
 * Utility function to create a WPCom request using the `jetpack-blogs` tunnel.
 * Fetches the blog id and the auth token from local storage.
 *
 */
export async function jetpackFetch(apiVersion: WPComAPIVersion, path: string) {
  const blogId = await readDependency(Dependency.blogId);
  const apiToken = await readDependency(Dependency.apiToken);
  const url = `https://public-api.wordpress.com/rest/v1.1/jetpack-blogs/${blogId}/rest-api/?path=/${apiVersion}/${path}`;
  console.log(`-- About to fetch: ${url}`); // We can delete this but seems handy for the time being to seee what requests are being fired.

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
  });
}
