import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const GroupItem = ({ group }) => {
  console.log(group);

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        margin: 10,
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 20,
      }}
    >
      <Text style={{ fontSize: 30 }}>{group.group_id}</Text>
      <Text style={{ fontSize: 30 }}>{group.group_name}</Text>
    </TouchableOpacity>
  );
};

export default GroupItem;

const styles = StyleSheet.create({});
