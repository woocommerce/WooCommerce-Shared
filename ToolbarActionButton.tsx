import { Platform, Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import { PlatformPressable } from "@react-navigation/elements";

export const ToolbarActionButton = ({
  label,
  onPress,
}: ToolbarActionButtonProps) => {
  return (
    <PlatformPressable
      style={styles.extraEdgeMarginOnRight}
      android_ripple={rippleConfig}
      onPress={onPress}
    >
      <Text style={styles.text}>{label}</Text>
    </PlatformPressable>
  );
};

const styles = StyleSheet.create({
  //from https://github.com/vonovak/react-navigation-header-buttons/blob/master/src/ButtonsWrapper.tsx#L58C3-L67C5
  text: {
    ...Platform.select({
      android: {
        color: "#896bb8",
        fontFamily: "sans-serif-medium",
        fontSize: 14,
        textTransform: "uppercase",
      },
      default: {
        color: "#896bb8",
        fontSize: 17,
        textTransform: "capitalize",
      },
    }),
  },
  extraEdgeMarginOnRight: {
    ...Platform.select({
      android: {
        marginRight: 14,
      },
      default: {
        marginRight: 15,
      },
    }),
  },
});

const rippleConfig = {
  foreground: true,
  borderless: true,
  radius: 20,
};


export interface ToolbarActionButtonProps {
  label: string;
  onPress: () => void;
}

export default ToolbarActionButton;
