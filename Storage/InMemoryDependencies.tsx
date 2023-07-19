/*
 * Functions to store and read values from memory.
 * Useful to not store values on disk for security reasons
 */

let apiToken: string | undefined = undefined;
let blogId: string | undefined = undefined;
let siteUrl: string | undefined = undefined;
let appPassword: string | undefined = undefined;

export function setApiToken(value: string) {
  apiToken = value;
}

export function getApiToken() {
  return apiToken;
}

export function setBlogId(value: string) {
  blogId = value;
}

export function getBlogId() {
  return blogId;
}

export function setSiteUrl(value: string) {
  siteUrl = value;
}

export function getSiteUrl() {
  return siteUrl;
}

export function setAppPassword(value: string) {
  appPassword = value;
}

export function getAppPassword() {
  return appPassword;
}
