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
