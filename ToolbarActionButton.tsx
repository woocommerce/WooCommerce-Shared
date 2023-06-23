import { Platform, Pressable, StyleSheet, Text } from "react-native";
import React from "react";

export const ToolbarActionButton = ({
  label,
  onPress,
}: ToolbarActionButtonProps) => {
  const formattedLabel = Platform.OS === "ios" ? label.toUpperCase() : label;

  return (
    <Pressable android_ripple={{ borderless: true }} onPress={onPress}>
      <Text style={styles.textStyle}>{formattedLabel}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  textStyle: {
    color: "#896bb8",
    fontSize: 16,
    fontWeight: "600",
  },
});

export interface ToolbarActionButtonProps {
  label: string;
  onPress: () => void;
}

export default ToolbarActionButton;
