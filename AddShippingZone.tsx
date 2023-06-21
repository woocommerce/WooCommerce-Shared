import React from "react";
import { Button, SafeAreaView, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AddShippingZone = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View>
        <Text>Add shipping zone</Text>
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
    </SafeAreaView>
  );
};

export default AddShippingZone;
