import { StyleSheet } from "react-native";
import React from "react";
import GroupLayout from "./GroupLayout";
import GroupList from "./GroupList";
import GroupAppBar from "./GroupAppBar";

const GroupContent = () => {
  return (
    <GroupLayout>
      <GroupAppBar />
      <GroupList />
    </GroupLayout>
  );
};

export default GroupContent;

const styles = StyleSheet.create({});
