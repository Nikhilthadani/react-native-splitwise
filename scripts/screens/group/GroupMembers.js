import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const GroupMembers = ({}) => {
  const route = useRoute();
  return (
    <View>
      <Text>GroupMembers</Text>
    </View>
  );
};

export default GroupMembers;

const styles = StyleSheet.create({});
