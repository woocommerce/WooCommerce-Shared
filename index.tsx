import React, { useEffect, useState } from "react";
import { AppRegistry } from "react-native";
import ShippingZonesList from "./ShippingZones";
import AddShippingZone from "./AddShippingZone";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationRoutes } from "./Navigation/NavigationRoutes";
import { Dependency, storeDependency } from "./Storage/AppDependencies";

const Stack = createNativeStackNavigator();

const NavigationStack = (props) => {
  /*
   * State needed to make sure that dependencies from the main app are stored before presenting the view.
   */
  const [savingDependencies, setSavingDependencies] = useState(true);

  /*
   * Store properties passed from the native app.
   * Currenty only `blogID` and `token`
   */
  const storeDependencies = async () => {
    setSavingDependencies(true);

    await storeDependency(Dependency.apiToken, props["token"]);
    await storeDependency(Dependency.blogId, props["blogId"]);

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
