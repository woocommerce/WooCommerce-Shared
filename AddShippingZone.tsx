import React, { useEffect, useState } from "react";
import {
  BackHandler,
  FlatList,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ToolbarActionButton } from "./ToolbarActionButton";
import FocusableTextInput from "./UI/FocusableTextInput";
import { addShippingZone } from "./API/ShippingZoneAPI";
import { Continent, Country, getRegions, Region, State } from "./API/DataApi";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { SemanticColor } from "./Utils/Colors/SemanticColors";

const AddShippingZone = () => {
  const navigation = useNavigation();

  const [name, setName] = React.useState("");
  const [isLimitEnabled, setLimitEnabled] = useState(false);
  const [regions, setRegions] = useState([]);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetchRegions().then((regions: Region[]) => {
      setRegions(regions);
    });
  }, []);

  useEffect(() => {
    let filteredRegions = regions
      .filter((region: Region) => {
        return region.name.includes(query);
      })
      .slice(0, 50);
    setSuggestions(query === "" ? [] : filteredRegions);
  }, [query]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        ToolbarActionButton({
          label: "Save",
          onPress: () => onAddShippingZonePressed(name),
        }),
    });
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, [navigation, name]);

  async function fetchRegions() {
    return await getRegions().then((continents) => {
      return continents.flatMap((continent) => {
        return [
          continent,
          ...continent.countries.flatMap((country) => [
            country,
            ...country.states,
          ]),
        ];
      });
    });
  }

  async function onAddShippingZonePressed(name) {
    await addShippingZone(name);
    navigation.goBack();
  }

  function handleBackButtonClick() {
    navigation.goBack();
    return true;
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
    <ScrollView contentContainerStyle={{ flex: 1 }} style={styles.container} nestedScrollEnabled={true}>
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
      <View style={styles.listContainer}>
        <FocusableTextInput
          selectionColor={"black"}
          style={[styles.textInput, { marginTop: 10 }]}
          placeholder="Type to search"
          onChangeText={(text) => {
            setQuery(text);
          }}
          value={query}
        />
        <FlatList
          nestedScrollEnabled={true}
          style={styles.list}
          data={suggestions}
          renderItem={({ item }) => SuggestionRow(item)}
        />
      </View>
      <View style={{ margin: 5 }} />
      {_renderPostCodes()}
    </ScrollView>
  );
};

function getRegionMargin(region: Region) {
  if (region instanceof State) {
    return 50;
  } else if (region instanceof Country) {
    return 30;
  } else if (region instanceof Continent) {
    return 10;
  }
}

function SuggestionRow(region: Region): JSX.Element {
  return (
    <View style={styles.row}>
      <View style={styles.row.textContainer}>
        <Text
          style={{
            backgroundColor: Colors.backgroundColor,
            marginLeft: getRegionMargin(region),
          }}
        >
          {region.name}
        </Text>
      </View>
      <View style={styles.separator} />
    </View>
  );
}

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
  separator: {
    backgroundColor: SemanticColor.separator(),
    height: 0.5,
  },
  listContainer: {
    zIndex: 1,
  },
  list: {
    marginTop: 60,
    position: "absolute",
    width: "100%",
  },
  row: {
    backgroundColor: SemanticColor.primaryBackground(),
    textContainer: {
      height: 50,
      flexDirection: "row",
      alignItems: "center",
    },
  },
});

export default AddShippingZone;
