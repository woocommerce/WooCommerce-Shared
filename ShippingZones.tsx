import {
  ActivityIndicator,
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { fetchShippingZones, ShippingZone } from "./API/ShippingZoneAPI";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutes } from "./Navigation/NavigationRoutes";

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

const ShippingZonesList = () => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<ShippingZone[]>([]);

  /*
   * Fetches the neccessary data for the shipping zones list.
   */
  const fetchData = async () => {
    setLoading(true);

    const zones = await fetchShippingZones();

    setLoading(false);
    setData(zones);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigation = useNavigation();

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
      <SafeAreaView>
        <Button
          title="+ Add new Shipping Zone"
          onPress={() => navigation.navigate(NavigationRoutes.AddShippingZone)}
        />
      </SafeAreaView>
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
export default ShippingZonesList;
