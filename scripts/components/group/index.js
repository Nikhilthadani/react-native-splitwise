import { StyleSheet, View } from "react-native";
import React from "react";
import GroupLayout from "./GroupLayout";
import GroupList from "./GroupList";

const GroupContent = ({ groups }) => {
  return (
    <GroupLayout>
      <View style={{ flex: 1 }}>
        {groups.length > 0 && <GroupList groups={groups} />}
      </View>
    </GroupLayout>
  );
};

export default GroupContent;

const styles = StyleSheet.create({});
