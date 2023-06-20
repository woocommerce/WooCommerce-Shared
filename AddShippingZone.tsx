import React from "react";
import { Button, SafeAreaView, Text, View } from "react-native";
import { useNavigate } from "react-router";

const AddShippingZone = () => {
  const navigate = useNavigate();

  return (
    <SafeAreaView>
      <View>
        <Text>Add shipping zone</Text>
        <Button title="Go back" onPress={() => navigate(-1)} />
      </View>
    </SafeAreaView>
  );
};

export default AddShippingZone;
