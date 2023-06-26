import React, { useState } from "react";
import {
  Linking,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CheckBox from "@react-native-community/checkbox";
import { ToolbarActionButton } from "./ToolbarActionButton";
import FocusableTextInput from "./UI/FocusableTextInput";

const AddShippingZone = () => {
  const navigation = useNavigation();

  const [isLimitEnabled, setLimitEnabled] = useState(false);

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        ToolbarActionButton({
          label: "Save",
          onPress: () => console.log("Toolbar action button pressed"),
        }),
    });
  }, [navigation]);

  const _renderPostCodes = function () {
    if (isLimitEnabled) {
      return (
        <View style={{ marginTop: 10 }}>
          <Text style={styles.labelText}>Postcodes</Text>
          <TextInput
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
              style={{
                color: "#68a5df",
                textDecorationLine: "underline",
              }}
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
      return null;
    }
  };

  return (
    <SafeAreaView>
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
          <Pressable onPress={() => setLimitEnabled(!isLimitEnabled)}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <CheckBox
                value={isLimitEnabled}
                onValueChange={(newValue) => setLimitEnabled(newValue)}
                style={{
                  ...(Platform.OS === "ios" ? { height: 20, width: 20 } : {}),
                }}
                /*Android only*/
                tintColors={{ true: "#896bb8" }}
                /*iOS only*/
                onCheckColor={"#896bb8"}
                onTintColor={"#896bb8"}
                boxType={"square"}
              />
              <Text
                style={{
                  ...(Platform.OS === "ios" ? { marginLeft: 10 } : {}),
                }}
              >
                Limit to specific ZIP/postcodes
              </Text>
            </View>
          </Pressable>
          {_renderPostCodes()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  labelText: {
    fontWeight: "bold",
    fontSize: 16.0,
    color: "black",
  },
  textInput: {
    paddingStart: 10,
    minHeight: 50,
    borderWidth: 2,
    borderRadius: 10,
  },
});

export default AddShippingZone;
