import { useContext } from "react";
import { Appearance, ColorValue } from "react-native";

export namespace SemanticColor {
  export const primaryBackground = (): ColorValue => {
    return isInLightMode() ? "white" : "black";
  };

  export const secondaryBackground = (): ColorValue => {
    return isInLightMode() ? "white" : "rgb(28, 28, 30)";
  };

  export const primaryText = (): ColorValue => {
    return isInLightMode() ? "black" : "white";
  };

  export const secondaryText = (): ColorValue => {
    return isInLightMode() ? "rgba(0, 0, 0, 0.6)" : "gray";
  };

  export const primary = (): ColorValue => {
    return isInLightMode() ? "rgb(124, 57, 130)" : "rgb(196, 117, 189)";
  };

  export const separator = (): ColorValue => {
    return isInLightMode() ? "rgba(60, 60, 67, 0.29)" : "rgba(84, 84, 88, 0.6)";
  };

  function isInDarkMode(): boolean {
    const colorScheme = Appearance.getColorScheme();
    return colorScheme === "dark";
  }

  function isInLightMode(): boolean {
    const colorScheme = Appearance.getColorScheme();
    return !isInDarkMode();
  }
}
