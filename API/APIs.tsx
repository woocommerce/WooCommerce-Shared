import { Dependency, readDependency } from "../Storage/AppDependencies";
import { jetpackFetch } from "./JetpackAPI";
import { restFetch } from "./RestAPI";

/*
 * WPCom API versions definitions
 */
export enum WPComAPIVersion {
  wcV3 = "wc/v3",
}

/*
 * Defines an API error.
 *
 */
export class APIError extends Error {
  path: string;
  statusCode: number;
  json?: { string: any };

  constructor(path: string, statusCode: number, json?: { string: any }) {
    super(`
    There was an error fetching: ${path} \n
    Status Code: ${statusCode} \n
    Response: ${JSON.stringify(json)} \n
    `);
    this.path = path;
    this.statusCode = statusCode;
    this.json = json;
  }
}

/*
 * Utility function to create a an API request.
 * It can use the `JetpackAPI` or the `RestAPI` depending on what credentials are available.
 */
export async function apiFetch(apiVersion: WPComAPIVersion, path: string) {
  const blogId = (await readDependency(Dependency.blogId)) ?? "";
  const apiToken = (await readDependency(Dependency.apiToken)) ?? "";

  if (blogId.length > 0 && apiToken.length > 0) {
    return jetpackFetch(apiVersion, path, blogId, apiToken);
  }

  return restFetch(apiVersion, path);
}

/*
 * Utility function to flatten the `data` object from a json.
 * We need this because the `JetpackAPI` returns json objects inside a `data` object.
 */
export function normalizeJSON(json: any) {
  return json.data ?? json;
}
