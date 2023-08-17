import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { SemanticColor } from "../Utils/Colors/SemanticColors";

/*
 * Button: Plus icon with text next it
 */
export const PlusButton = ({ label, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        style={styles.icon}
        source={require("./../Assets/Icons/plus.png")}
      />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  icon: {
    marginRight: 10,
    tintColor: SemanticColor.primary(),
  },
  label: {
    fontSize: 18,
    color: SemanticColor.primary(),
  },
};
