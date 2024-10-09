import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";

const FriendPage = () => {
  const { params } = useRoute();
  return (
    <View>
      <Text>{JSON.stringify(params)}</Text>
    </View>
  );
};

export default FriendPage;

const styles = StyleSheet.create({});
