import { NativeModules } from "react-native";

export const sendAnalyticsEvent = (event) => {
  NativeModules.AnalyticsModule.sendEvent(event);
};
