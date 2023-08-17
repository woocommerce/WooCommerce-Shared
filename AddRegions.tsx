import { Continent, Country, getRegions, Region, State } from "./API/DataApi";

import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SemanticColor } from "./Utils/Colors/SemanticColors";
import FocusableTextInput from "./UI/FocusableTextInput";
import { Checkbox } from "expo-checkbox";

type Suggestion = {
  checked: Boolean;
  region: Region;
};

const AddRegions = () => {
  const [regions, setRegions] = useState([]);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);

  useEffect(() => {
    let filteredRegions = regions
      .filter((region: Region) => {
        return region.name.includes(query);
      })
      .map((region): Suggestion => {
        return {
          checked: selectedRegions.includes(region),
          region: region,
        };
      });
    setSuggestions(query === "" ? [] : filteredRegions);
  }, [query, selectedRegions]);

  useEffect(() => {
    fetchRegions().then((regions: Region[]) => {
      setRegions(regions);
    });
  }, []);

  function SuggestionRow(suggestion: Suggestion): JSX.Element {
    return (
      <TouchableOpacity
        style={styles.row}
        onPress={() => {
          // We need to make a copy of the list to trigger dependant effect. If we just edited selectedRegions
          // and set it via setSelectedRegions, nothing would be triggered.
          const listCopy = () => {
            if (selectedRegions.includes(suggestion.region)) {
              return selectedRegions.filter(
                (region) => region != suggestion.region
              );
            } else {
              selectedRegions.push(suggestion.region);
              return [...selectedRegions];
            }
          };
          setSelectedRegions(listCopy);
        }}
      >
        <View style={styles.row.textContainer}>
          <Checkbox
            color={suggestion.checked ? SemanticColor.primary() : undefined}
            value={suggestion.checked}
            style={styles.checkboxBase}
          />
          <Text
            style={{
              color: SemanticColor.primaryText(),
              marginLeft: getRegionMargin(suggestion.region),
            }}
          >
            {suggestion.region.name}
          </Text>
        </View>
        <View style={styles.separator} />
      </TouchableOpacity>
    );
  }

  const buttonText = () => {
    const selectedRegionsSize = selectedRegions.length;
    if (selectedRegionsSize == 0) {
      return "Done";
    } else if (selectedRegionsSize == 1) {
      return `Select ${selectedRegionsSize} region`;
    } else {
      return `Select ${selectedRegionsSize} regions`;
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: SemanticColor.primaryBackground(),
      }}
    >
      <View style={{ flex: 1, flexDirection: "column" }}>
        <FocusableTextInput
          selectionColor={"black"}
          style={styles.textInput}
          placeholder="Type to search"
          onChangeText={(text) => {
            setQuery(text);
          }}
        />
        <FlatList
          nestedScrollEnabled={true}
          style={styles.list}
          data={suggestions}
          renderItem={({ item }) => SuggestionRow(item)}
        />
      </View>

      <View
        style={{
          height: 80,
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={{
            alignItems: "center",
            borderRadius: 3,
            marginHorizontal: 20,
            padding: 10,
            backgroundColor: SemanticColor.primary(),
          }}
        >
          <Text style={{ color: "white", fontWeight: 500 }}>
            {buttonText()}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  list: {},
  textInput: {
    margin: 10,
    paddingStart: 10,
    minHeight: 50,
    borderWidth: 2,
    borderRadius: 10,
  },
  row: {
    backgroundColor: SemanticColor.primaryBackground(),
    textContainer: {
      height: 50,
      flexDirection: "row",
      alignItems: "center",
    },
  },
  separator: {
    backgroundColor: SemanticColor.separator(),
    height: 0.5,
  },
  checkboxBase: {
    width: 24,
    marginLeft: 10,
    height: 24,
    borderRadius: 99,
    borderWidth: 2,
    borderColor: "grey",
    backgroundColor: "transparent",
  },
});

function getRegionMargin(region: Region) {
  if (region instanceof State) {
    return 50;
  } else if (region instanceof Country) {
    return 30;
  } else if (region instanceof Continent) {
    return 10;
  }
}

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

export default AddRegions;
