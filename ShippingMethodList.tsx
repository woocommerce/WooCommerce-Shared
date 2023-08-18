import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SemanticColor } from "./Utils/Colors/SemanticColors";

/*
 * Available shipping method list.
 */
export const ShippingMethodList = ({ onSelected }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.header.title}>Add Shipping Method</Text>
        <Text style={styles.header.description}>
          Choose the shipping method you wish to add. Only shipping methods
          which support zones are listed.
        </Text>
      </View>

      <TouchableOpacity style={styles.method}>
        <Text style={styles.method.title}>Flat Rate</Text>
        <Text style={styles.method.description}>
          Lets you charge a fixed rate for shipping.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.method}>
        <Text style={styles.method.title}>Free Shipping</Text>
        <Text style={styles.method.description}>
          Free shipping is a special method which can be triggered with coupons
          and minimum spends.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.method}>
        <Text style={styles.method.title}>Local Pickup</Text>
        <Text style={styles.method.description}>
          Allow customers to pick up orders themselves. By default, when using
          local pickup store base taxes will apply regardless of customer
          address.
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    paddingTop: 20,
    paddingBottom: 42,
  },
  header: {
    marginBottom: 24,
    title: {
      fontSize: 17,
      marginBottom: 4,
      fontWeight: "bold",
      color: SemanticColor.primaryText(),
    },
    description: {
      fontSize: 15,
      color: SemanticColor.secondaryText(),
    },
  },
  method: {
    marginBottom: 12,
    title: {
      fontSize: 17,
      marginBottom: 4,
      color: SemanticColor.primaryText(),
    },
    description: {
      fontSize: 15,
      color: SemanticColor.secondaryText(),
    },
  },
};
