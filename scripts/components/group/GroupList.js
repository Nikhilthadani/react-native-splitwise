import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import GroupItem from "../../screens/group/GroupItem";
import {} from "react-native-paper";

const GroupList = ({ groups }) => {
  return (
    <View style={{ flex: 1 }}>
      <View>
        <FlatList
          style={{ padding: 10 }}
          data={groups}
          renderItem={({ item }) => <GroupItem group={item} />}
        />
      </View>
    </View>
  );
};

export default GroupList;

const styles = StyleSheet.create({});
