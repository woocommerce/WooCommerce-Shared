import { Alert, Platform } from "react-native";

const API_LINK = "https://public-api.wordpress.com/rest/v1.1/tracks/record";
const validEventOrPropNamePattern = /^[a-z_][a-z0-9_]*$/;

interface Params {
  [key: string]: any;
}

export class Tracks {
  static client: Tracks = new Tracks();

  PLATFORM_PREFIX =
    Platform.OS === "ios" ? "woocommerceios" : "woocommerceandroid";

  getGlobalParams(): Params {
    return {
      _ts: Date.now(),
      _ul: "test",
      _ut: "wpcom:user_id",
    };
  }

  trackEvent(eventName: string, extraParams: Params = {}): Promise<void> {
    const params = Object.assign({}, this.getGlobalParams(), extraParams);
    const eventNamePrefixed = `${this.PLATFORM_PREFIX}_${eventName}`;

    if (!validEventOrPropNamePattern.test(eventNamePrefixed)) {
      console.warn(
        `Error: Invalid event name detected: ${eventNamePrefixed} -- this event will be rejected during ETL`
      );
    }

    const event: Params = Object.assign(params, {
      _en: eventNamePrefixed,
    });

    Object.keys(extraParams).forEach((propName) => {
      if (!validEventOrPropNamePattern.test(propName)) {
        console.warn(
          `Error: Invalid prop name detected: ${propName} -- this event will be rejected during ETL`
        );
      }
    });

    console.log(`tracking: ${eventNamePrefixed}`);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        events: [
          {
            event,
          },
        ],
      }),
    };

    return fetch(API_LINK, requestOptions)
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        console.error(
          `There was a problem with the fetch operation: ${error.toString()}`
        );
      });
  }
}
