import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
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
  icon: NodeRequire;
  showNavigationIndicator: boolean;
};

function Row(props: RowProps): JSX.Element {
  return (
    <View style={styles.row}>
      <View style={styles.row.content}>
        <View style={styles.row.icon}>
          <Image source={props.icon} />
        </View>
        <View style={styles.row.textContainer}>
          <Text style={styles.row.title}>{props.title}</Text>
          {props.body.length > 0 && (
            <Text style={styles.row.body}>{props.body}</Text>
          )}
          {props.caption.length > 0 && (
            <Text style={styles.row.caption}>{props.caption}</Text>
          )}
        </View>
        {props.showNavigationIndicator &&
          isFeatureEnabled(LocalFeatureFlag.addShippingZones) && (
            <Text style={styles.row.disclosureIndicator}>›</Text>
          )}
      </View>
      <View style={styles.row.separator} />
    </View>
  );
}

const ShippingZonesList = () => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<RowProps[]>([]);

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
   * Information Row properties for the shipping zones list.
   */
  const InfoRowProps = (): RowProps => {
    return {
      title:
        "Shipping zones determine the available shipping methods based on a customer's shipping address.",
      body: "During checkout, customers can choose from available shipping methods in their zone.",
      caption: "",
      icon: require("./Assets/Icons/info.png"),
      showNavigationIndicator: false,
    };
  };

  /*
   * "Locations Not Covered" Row properties for the shipping zones list.
   */
  const LocationNotCoveredRowProps = (): RowProps => {
    return {
      title: "Locations not covered by your other zones",
      body: "This zone is optionally used for regions that are not included in any other shipping zone.",
      caption: "No shipping methods offered to this zone",
      icon: require("./Assets/Icons/world.png"),
      showNavigationIndicator: false,
    };
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
      setData(adaptZones(zones));
    } catch (error) {
      console.log(error);
      sendAnalyticsEvent("shipping_zones_fetch_failed");
      showRetryAlert();
    }

    setLoading(false);
  };

  /*
   * Transforms the given zones array into a RowProps array and:
   * - Move the "Location Not Covered" zone to the bottom of the array.
   * - Adds info row to te beginning of the array.
   */
  const adaptZones = (zones: ShippingZone[]): RowProps[] => {
    const locationsNotCoveredId = 0;
    const locationsNotCoveredIndex = zones.findIndex(
      (element) => element.id === locationsNotCoveredId
    );

    // Transform all zones
    const rows = zones.map((zone) => {
      return {
        title: zone.title,
        body: zone.locations.map((location) => location.name).join(", "),
        caption: zone.methods.map((method) => method.title).join(", "),
        icon: require("./Assets/Icons/location.png"),
        showNavigationIndicator: true,
      };
    });

    // Move down the "Location Not Covered" zone
    if (locationsNotCoveredIndex >= 0) {
      rows.splice(locationsNotCoveredIndex, 1);
      rows.push(LocationNotCoveredRowProps());
    }

    // Insert the info row
    return [InfoRowProps(), ...rows];
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
              body={item.body}
              caption={item.caption}
              icon={item.icon}
              showNavigationIndicator={item.showNavigationIndicator}
            />
          )}
          keyExtractor={(item) => item.title}
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
    icon: {
      flexDirection: "column",
      alignSelf: "baseline",
      paddingRight: 12,
      paddingTop: 2,
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
