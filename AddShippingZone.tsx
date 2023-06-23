import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CheckBox from "@react-native-community/checkbox";
import { ToolbarActionButton } from "./ToolbarActionButton";

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
        <View>
          <Text style={styles.labelText}>Postcodes</Text>
          <TextInput
            selectionColor={"black"}
            style={[styles.textInput, { marginTop: 10 }]}
            placeholder="List 1 postcode per line"
          />
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <SafeAreaView>
      <View style={{ padding: 16, backgroundColor: "white" }}>
        <Text style={styles.labelText}>Zone name</Text>
        <TextInput
          selectionColor={"black"}
          style={[styles.textInput, { marginTop: 10 }]}
          placeholder="Enter name"
        />
        <View style={{ margin: 10 }} />
        <Text style={styles.labelText}>Zone region</Text>
        <TextInput
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
              tintColors={{ true: "#896bb8" }}
            />
            <Text>Limit to specific ZIP/postcodes</Text>
          </View>
        </Pressable>
        {_renderPostCodes()}
      </View>
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
    borderColor: "#896bb8",
    borderWidth: 2,
    borderRadius: 10,
  },
});

export default AddShippingZone;
