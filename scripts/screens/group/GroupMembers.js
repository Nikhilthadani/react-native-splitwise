import { Text, View } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";

const GroupMembers = ({}) => {
  const route = useRoute();
  return (
    <View>
      <Text>GroupMembers</Text>
    </View>
  );
};

export default GroupMembers;
