import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  AppRegistry,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { fetchShippingZones, ShippingZone } from "./API/ShippingZoneAPI";
import { recordTracksEvent } from "@automattic/calypso-analytics";

type RowProps = {
  title: string;
  body: string;
  caption: string;
};

function Row(props: RowProps): JSX.Element {
  return (
    <View style={styles.row}>
      <Text style={styles.row.title}> {props.title} </Text>
      <Text style={styles.row.body}> {props.body} </Text>
      <Text style={styles.row.caption}> {props.caption} </Text>
    </View>
  );
}

const App = (props) => {
  recordTracksEvent("woocommerceandroid_test_from_reactnative");
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<ShippingZone[]>([]);

  const fetchData = async () => {
    setLoading(true);

    const zones = await fetchShippingZones(props["blogId"], props["token"]);

    setLoading(false);
    setData(zones);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <SafeAreaView>
          <ActivityIndicator />
        </SafeAreaView>
      ) : (
        <FlatList
          contentInsetAdjustmentBehavior="always"
          style={styles.list}
          data={data}
          renderItem={({ item }) => (
            <Row
              title={item.title}
              body={item.locations.map((location) => location.code).join(" - ")}
              caption={item.methods.map((method) => method.title).join(" - ")}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    backgroundColor: "rgb(246, 247, 247)",
  },
  row: {
    padding: 16,
    fontSize: 23,
    borderRadius: 16,
    backgroundColor: "white",
    margin: 16,
    marginTop: 0,
    title: {
      fontFamily: "System",
      fontSize: 17,
      marginBottom: 4,
      color: "rgb(0, 0, 0)",
    },
    body: {
      fontFamily: "System",
      fontSize: 14,
      color: "rgba(0, 0, 0, 0.6)",
    },
    caption: {
      fontFamily: "System",
      fontSize: 12,
      color: "rgba(0, 0, 0, 0.6)",
    },
  },
});

export default App;
AppRegistry.registerComponent("main", () => App);
