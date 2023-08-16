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

  useEffect(() => {
    let filteredRegions = regions
      .filter((region: Region) => {
        return region.name.includes(query);
      })
      .slice(0, 50)
      .map((region): Suggestion => {
        return {
          checked: false,
          region: region,
        };
      });
    setSuggestions(query === "" ? [] : filteredRegions);
  }, [query]);

  useEffect(() => {
    fetchRegions().then((regions: Region[]) => {
      setRegions(regions);
    });
  }, []);

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

  function SuggestionRow(suggestion: Suggestion): JSX.Element {
    return (
      <TouchableOpacity
        style={styles.row}
        onPress={() => {
          setSuggestions(
            suggestions.map((mapingSuggestion: Suggestion): Suggestion => {
              if (mapingSuggestion.region == suggestion.region) {
                return {
                  checked: !mapingSuggestion.checked,
                  region: mapingSuggestion.region,
                };
              } else {
                return mapingSuggestion;
              }
            })
          );
        }}
      >
        <View style={styles.row.textContainer}>
          <Checkbox
              color={suggestion.checked ? SemanticColor.primary() : undefined}
          value={suggestion.checked}
              style={{ marginLeft: 20 }}
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

  function getRegionMargin(region: Region) {
    if (region instanceof State) {
      return 50;
    } else if (region instanceof Country) {
      return 30;
    } else if (region instanceof Continent) {
      return 10;
    }
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: SemanticColor.primaryBackground(),
      }}
    >
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
});

export default AddRegions;
