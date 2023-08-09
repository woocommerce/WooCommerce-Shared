import {
  ActivityIndicator,
  Alert,
  FlatList,
  NativeModules,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { fetchShippingZones, ShippingZone } from "./API/ShippingZoneAPI";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NavigationRoutes } from "./Navigation/NavigationRoutes";
import ToolbarActionButton from "./ToolbarActionButton";
import { HeaderBackButton } from "@react-navigation/elements";
import { isFeatureEnabled, LocalFeatureFlag } from "./Utils/FeatureFlag";
import { SemanticColor } from "./Utils/Colors/SemanticColors";
import { sendAnalyticsEvent } from "./Analytics/SendAnalyticsEvent";

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
      sendAnalyticsEvent("shipping_zones_list_loaded");
      setData(zones);
    } catch (error) {
      console.log(error);
      sendAnalyticsEvent("shipping_zones_fetch_failed");
      showRetryAlert();
    }

    setLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      sendAnalyticsEvent("shipping_zones_view_shown");
      fetchData();
    }, [])
  );

  const navigation = useNavigation();

  useEffect(() => {
    let options: any = {
      headerLeft: () => (
        <HeaderBackButton
          tintColor={SemanticColor.backButton().toString()}
          style={{ marginLeft: Platform.OS === "ios" ? -15 : -5 }}
          label="Settings"
          labelVisible={false}
          onPress={() => {
            NativeModules.ExitModule.exit();
          }}
        />
      ),
    };

    if (isFeatureEnabled(LocalFeatureFlag.addShippingZones)) {
      options.headerRight = () => (
        <ToolbarActionButton
          label={"Add"}
          onPress={() => navigation.navigate(NavigationRoutes.AddShippingZone)}
        />
      );
    }

    navigation.setOptions(options);
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
    backgroundColor: SemanticColor.primaryBackground(),
  },
  list: {
    backgroundColor: SemanticColor.primaryBackground(),
    loadingIndicator: {
      marginTop: 32,
    },
  },
  row: {
    flex: 1,
    backgroundColor: SemanticColor.secondaryBackground(),
    content: {
      flexDirection: "row",
      alignItems: "center",
      padding: 0,
      fontSize: 23,
      borderRadius: 0,
      margin: 16,
    },
    textContainer: {
      flex: 1,
    },
    title: {
      fontFamily: "System",
      fontSize: 17,
      marginBottom: 6,
      color: SemanticColor.primaryText(),
    },
    body: {
      fontFamily: "System",
      fontSize: 15,
      marginBottom: 6,
      color: SemanticColor.secondaryText(),
    },
    caption: {
      fontFamily: "System",
      fontSize: 15,
      color: SemanticColor.secondaryText(),
    },
    disclosureIndicator: {
      fontSize: 32,
      color: SemanticColor.primary(),
    },
    separator: {
      backgroundColor: SemanticColor.separator(),
      height: 0.5,
      marginLeft: 16,
    },
  },
});
export default ShippingZonesList;
