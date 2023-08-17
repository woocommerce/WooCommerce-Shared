import React, { useEffect, useState } from "react";
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
import { addShippingZone } from "./API/ShippingZoneAPI";
import { PlusButton } from "./UI/PlusButton";
import { LocalFeatureFlag, isFeatureEnabled } from "./Utils/FeatureFlag";
import { SemanticColor } from "./Utils/Colors/SemanticColors";
import { NavigationRoutes } from "./Navigation/NavigationRoutes";

const AddShippingZone = () => {
  const navigation = useNavigation();

  const [name, setName] = React.useState("");
  const [isLimitEnabled, setLimitEnabled] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        ToolbarActionButton({
          label: "Save",
          onPress: () => onAddShippingZonePressed(name),
        }),
    });
  }, [navigation, name]);

  async function onAddShippingZonePressed(name) {
    await addShippingZone(name);
    navigation.goBack();
  }

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

  const handlePlusPress = () => {
    // Add your logic here
    console.log("Plus button pressed");
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
            onChangeText={(text) => {
              setName(text);
            }}
            value={name}
          />
          <View style={{ margin: 10 }} />
          <Text style={styles.labelText}>Zone region</Text>
          {isFeatureEnabled(LocalFeatureFlag.addShippingMethods) && (
            <PlusButton
              label="Add Shipping Zones"
              onPress={() => navigation.navigate(NavigationRoutes.AddRegions)}
            />
          )}
          <View style={{ margin: 5 }} />
          {_renderPostCodes()}
          {isFeatureEnabled(LocalFeatureFlag.addShippingMethods) && (
            <PlusButton label="Add Shipping Method" onPress={handlePlusPress} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: SemanticColor.primaryBackground(),
    flexGrow: 1,
  },
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
  addRegionsButton: {
    height: 40,
    alignSelf: "center",
    alignContent: "center",
    alignItems: "center",
  },
  listContainer: {
    zIndex: 1,
  },
});

export default AddShippingZone;
