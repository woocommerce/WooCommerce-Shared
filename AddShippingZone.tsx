import { Button, Text, View } from "react-native";
import { useNavigate } from "react-router";

const AddShippingZone = () => {
  const navigate = useNavigate();

  return (
    <View>
      <Text>Add shipping zone</Text>
      <Button title="Go back" onPress={() => navigate(-1)} />
    </View>
  );
};

export default AddShippingZone;
