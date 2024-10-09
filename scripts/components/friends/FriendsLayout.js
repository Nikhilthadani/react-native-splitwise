import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FriendsAppBar from "./FriendsAppBar";

const FriendsLayout = ({ children }) => {
  return (
    <View style={{ flex: 1 }}>
      <FriendsAppBar />
      <Text>All Friends</Text>
      <View style={{ flex: 1 }}>{children}</View>
    </View>
  );
};

export default FriendsLayout;

const styles = StyleSheet.create({});
