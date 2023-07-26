//**Do not** remove OR reorder this import: https://reactnavigation.org/docs/stack-navigator
import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { AppRegistry } from "react-native";
import ShippingZonesList from "./ShippingZones";
import AddShippingZone from "./AddShippingZone";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationRoutes } from "./Navigation/NavigationRoutes";
import {
  setApiToken,
  setAppPassword,
  setBlogId,
  setSiteUrl,
} from "./Storage/InMemoryDependencies";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { BLOG_ID, TOKEN, APP_PASSWORD, SITE_URL } from "@env";

const Stack = createStackNavigator();

const NavigationStack = (props) => {
  /*
   * State needed to make sure that dependencies from the main app are stored before presenting the view.
   */
  const [savingDependencies, setSavingDependencies] = useState(true);

  /*
   * Store properties passed from the native app.
   * Currenty only `blogID`, `token`, `siteUrl`, and `appPassword`
   */
  const storeDependencies = () => {
    setSavingDependencies(true);

    setBlogId(props["blogId"] ?? BLOG_ID);
    setApiToken(props["token"] ?? TOKEN);
    setSiteUrl(props["siteUrl"] ?? SITE_URL);
    setAppPassword(props["appPassword"] ?? APP_PASSWORD);

    setSavingDependencies(false);
  };

  /*
   * Store dependencies as soon as the component is mounted.
   */
  useEffect(() => {
    storeDependencies();
  }, []);

  /*
   * Returns the `NativeRouter` component after the dependencies have been saved.
   * We need to wait for them to be saved because `ShippingZonesList` will read that data.
   */
  const Router = () => {
    if (savingDependencies) {
      return null;
    }

    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={screenOptionStyle}>
          <Stack.Screen
            name={NavigationRoutes.ShippingZonesList}
            component={ShippingZonesList}
            options={{
              title: "Shipping Zones",
            }}
          />
          <Stack.Screen
            name={NavigationRoutes.AddShippingZone}
            component={AddShippingZone}
            options={{
              title: "New Zone",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };
  return <Router />;
};

const screenOptionStyle = {
  ...TransitionPresets.SlideFromRightIOS,
  headerTintColor: "#896bb8",
  headerTitleStyle: { color: "black" },
};

AppRegistry.registerComponent("main", () => NavigationStack);
