import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Alert,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { fetchShippingZones, ShippingZone } from "./API/ShippingZoneAPI";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutes } from "./Navigation/NavigationRoutes";
import ToolbarActionButton from "./ToolbarActionButton";
import { NativeModules } from "react-native";
import { LocalFeatureFlag, isFeatureEnabled } from "./Utils/FeatureFlag";
import { HeaderBackButton } from "@react-navigation/elements";

const sendAnalyticsEvent = (event) => {
  NativeModules.AnalyticsModule.sendEvent(event);
};

type RowProps = {
  title: string;
  body: string;
  caption: string;
};

function Row(props: RowProps): JSX.Element {
  return (
    <View style={styles.row}>
      <View style={styles.row.content}>
        <View style={styles.row.textContainer}>
          <Text style={styles.row.title}> {props.title} </Text>
          {props.body.length > 0 && (
            <Text style={styles.row.body}> {props.body} </Text>
          )}
          {props.caption.length > 0 && (
            <Text style={styles.row.caption}> {props.caption} </Text>
          )}
        </View>
        {isFeatureEnabled(LocalFeatureFlag.addShippingZones) && (
          <Text style={styles.row.disclosureIndicator}>›</Text>
        )}
      </View>
      <View style={styles.row.separator} />
    </View>
  );
}

const ShippingZonesList = () => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<ShippingZone[]>([]);

  /*
   * Shows an alert that allows the user to retry the fetch operation.
   */
  const showRetryAlert = () => {
    Alert.alert(
      "",
      "There was an error loading shipping zones, pleae try again later.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "Retry", onPress: () => fetchData() },
      ]
    );
  };

  /*
   * Fetches the neccessary data for the shipping zones list.
   * If the operation fails, a retry alert is shown.
   */
  const fetchData = async () => {
    setLoading(true);

    try {
      const zones = await fetchShippingZones();
      setData(zones);
      sendAnalyticsEvent("shipping_zones_shown");
    } catch (error) {
      console.log(error);
      showRetryAlert();
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigation = useNavigation();

  useEffect(() => {
    if (!isFeatureEnabled(LocalFeatureFlag.addShippingZones)) {
      return;
    }

    navigation.setOptions({
      headerLeft: () => <HeaderBackButton
          style={{marginLeft: Platform.OS === "ios" ? -15 : -5}}
          labelVisible={Platform.OS === "ios"}
          label="Settings"
          onPress={() => {
            NativeModules.ExitModule.exit();
          }}/>,
      headerRight: () => (
        <ToolbarActionButton
          label={"Add"}
          onPress={() => navigation.navigate(NavigationRoutes.AddShippingZone)}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <SafeAreaView>
          <ActivityIndicator style={styles.list.loadingIndicator} />
        </SafeAreaView>
      ) : (
        <FlatList
          contentInsetAdjustmentBehavior="always"
          style={styles.list}
          data={data}
          renderItem={({ item }) => (
            <Row
              title={item.title}
              body={item.locations.map((location) => location.name).join(", ")}
              caption={item.methods.map((method) => method.title).join(", ")}
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
    backgroundColor: "white",
    loadingIndicator: {
      marginTop: 32,
    },
  },
  row: {
    flex: 1,
    content: {
      flexDirection: "row",
      alignItems: "center",
      padding: 0,
      fontSize: 23,
      borderRadius: 0,
      backgroundColor: "white",
      margin: 16,
    },
    textContainer: {
      flex: 1,
    },
    title: {
      fontFamily: "System",
      fontSize: 17,
      marginBottom: 6,
      color: "rgb(0, 0, 0)",
    },
    body: {
      fontFamily: "System",
      fontSize: 15,
      marginBottom: 6,
      color: "rgba(0, 0, 0, 0.6)",
    },
    caption: {
      fontFamily: "System",
      fontSize: 15,
      color: "rgba(0, 0, 0, 0.6)",
    },
    disclosureIndicator: {
      fontSize: 32,
      color: "rgb(103, 67, 153)",
    },
    separator: {
      backgroundColor: "rgba(60, 60, 67, 0.29)",
      height: 0.5,
      marginLeft: 16,
    },
  },
});
export default ShippingZonesList;
