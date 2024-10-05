import { View, Text } from "react-native";
import React from "react";
import GroupAppBar from "./GroupAppBar";

const GroupLayout = ({ children }) => {
  return (
    <View style={{ flex: 1 }}>
      <GroupAppBar />
      <Text>All Groups</Text>
      <View style={{ flex: 1 }}>{children}</View>
    </View>
  );
};

export default GroupLayout;
