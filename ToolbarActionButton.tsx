import { Platform, Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import { SemanticColor } from "./Utils/SemanticColors";

export const ToolbarActionButton = ({
  label,
  onPress,
}: ToolbarActionButtonProps) => {
  const formattedLabel =
    Platform.OS === "android" ? label.toUpperCase() : label;

  return (
    <Pressable android_ripple={{ borderless: true }} onPress={onPress}>
      <Text style={styles.textStyle}>{formattedLabel}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  textStyle: {
    color: SemanticColor.primary(),
    fontSize: 16,
    fontWeight: "600",
  },
});

export interface ToolbarActionButtonProps {
  label: string;
  onPress: () => void;
}

export default ToolbarActionButton;
