import React from "react";
import { AppRegistry } from "react-native";
import { NativeRouter, Route, Routes } from "react-router-native";
import ShippingZonesList from "./ShippingZones";
import AddShippingZone from "./AddShippingZone";

import { useEffect, useState } from "react";
import { Dependency, storeDependency } from "./Storage/AppDependencies";

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
      <NativeRouter>
        <Routes>
          <Route path="/" element={<ShippingZonesList />} />
          <Route path="/addShippingZone" element={<AddShippingZone />} />
        </Routes>
      </NativeRouter>
    );
  };

  return <Router />;
};

AppRegistry.registerComponent("main", () => NavigationStack);
