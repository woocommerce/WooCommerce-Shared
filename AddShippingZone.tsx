import React, { useEffect, useState } from "react";
import {
  BackHandler,
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ToolbarActionButton } from "./ToolbarActionButton";
import FocusableTextInput from "./UI/FocusableTextInput";
import { addShippingZone } from "./API/ShippingZoneAPI";
import { Continent, Country, Region, State } from "./API/DataApi";
import { Colors } from "react-native/Libraries/NewAppScreen";
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

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      style={styles.container}
      nestedScrollEnabled={true}
    >
      <SafeAreaView>
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
        <View style={{ flexDirection: "row" }}>
          <FocusableTextInput
            selectionColor={"black"}
            style={[styles.textInput, { marginTop: 10, width: "75%" }]}
            placeholder="Type to search"
            onChangeText={(text) => {}}
          />
          <TouchableOpacity
            style={styles.addRegionsButton}
            onPress={() => {
              navigation.navigate(NavigationRoutes.AddRegions);
            }}
          >
            <Text>Add region</Text>
          </TouchableOpacity>
        </View>
        <View style={{ margin: 5 }} />
        {_renderPostCodes()}
      </SafeAreaView>
    </ScrollView>
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
  clickableText: {
    color: "#68a5df",
    textDecorationLine: "underline",
  },
  addRegionsButton: {
    width: "25%",
    alignSelf: "center",
    alignItems: "center",
  },
  listContainer: {
    zIndex: 1,
  },
});

export default AddShippingZone;
