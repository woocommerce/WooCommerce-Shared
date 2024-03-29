import React, { useEffect, useState } from "react";
import { AppRegistry, Appearance } from "react-native";
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

import { BLOG_ID, TOKEN, APP_PASSWORD, SITE_URL } from "@env";
import { SemanticColor } from "./Utils/Colors/SemanticColors";

const Stack = createNativeStackNavigator();

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
        <Stack.Navigator
          screenOptions={{
            animation: "slide_from_right",
            headerStyle: {
              backgroundColor: SemanticColor.secondaryBackground(),
            },
            headerTintColor: SemanticColor.primary(),
            headerTitleStyle: {
              color: SemanticColor.primaryText(),
            },
            headerBackTitleVisible: false,
          }}
        >
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

AppRegistry.registerComponent("main", () => NavigationStack);
