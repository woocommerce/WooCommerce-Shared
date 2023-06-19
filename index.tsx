import React from "react";
import { AppRegistry } from "react-native";
import { NativeRouter, Route, Routes } from "react-router-native";
import ShippingZonesList from "./ShippingZones";
import AddShippingZone from "./AddShippingZone";

const NavigationStack = () => {
  return (
    <NativeRouter>
      <Routes>
        <Route path="/" element={<ShippingZonesList />} />
        <Route path="/addShippingZone" element={<AddShippingZone />} />
      </Routes>
    </NativeRouter>
  );
};

AppRegistry.registerComponent("main", () => NavigationStack);
