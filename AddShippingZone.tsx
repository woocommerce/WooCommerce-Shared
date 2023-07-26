import React, { useState, useEffect } from "react";
import {
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ToolbarActionButton } from "./ToolbarActionButton";
import FocusableTextInput from "./UI/FocusableTextInput";

const AddShippingZone = () => {
  const navigation = useNavigation();

  const [isLimitEnabled, setLimitEnabled] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ToolbarActionButton
          label={"Save"}
          onPress={() => console.log("Toolbar action button pressed")}
        />
      ),
    });
  }, [navigation]);

  const _renderPostCodes = function () {
    if (isLimitEnabled) {
      return (
        <View style={{ marginTop: 10 }}>
          <Text style={styles.labelText}>Postcodes</Text>
          <FocusableTextInput
            selectionColor={"black"}
            style={[styles.textInput, { marginTop: 10 }]}
            multiline={true}
            placeholder="List 1 postcode per line"
          />
          <Text
            style={{
              marginTop: 10,
              color: "gray",
            }}
          >
            Postcodes containing wildcards (e.g. CB23*) or fully numeric ranges
            (e.g. 90210...99000) are also supported. Please see the shipping
            zones{" "}
            <Text
              style={styles.clickableText}
              onPress={() =>
                Linking.openURL(
                  "https://woocommerce.com/document/setting-up-shipping-zones/#section-3"
                )
              }
            >
              documentation
            </Text>{" "}
            for more information.
          </Text>
        </View>
      );
    } else {
      return (
        <Pressable onPress={() => setLimitEnabled(true)}>
          <Text style={styles.clickableText}>
            Limit to specific ZIP/postcodes
          </Text>
        </Pressable>
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ padding: 16, backgroundColor: "white" }}>
          <Text style={styles.labelText}>Zone name</Text>
          <FocusableTextInput
            selectionColor={"black"}
            style={[styles.textInput, { marginTop: 10 }]}
            placeholder="Enter name"
          />
          <View style={{ margin: 10 }} />
          <Text style={styles.labelText}>Zone region</Text>
          <FocusableTextInput
            selectionColor={"black"}
            style={[styles.textInput, { marginTop: 10 }]}
            placeholder="Type to search"
          />
          <View style={{ margin: 5 }} />
          {_renderPostCodes()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  labelText: {
    fontWeight: "500",
    fontSize: 16.0,
    color: "black",
  },
  textInput: {
    paddingStart: 10,
    minHeight: 50,
    borderWidth: 2,
    borderRadius: 10,
  },
  clickableText: {
    color: "#68a5df",
    textDecorationLine: "underline",
  },
});

export default AddShippingZone;
