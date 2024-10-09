import { StyleSheet, View } from "react-native";
import React from "react";
import GroupLayout from "./GroupLayout";
import GroupList from "./GroupList";
import FloatingFab from "../fab/FloatingFab";
import { ExpensesComponent } from "../../utils/constants";

const GroupContent = ({ groups }) => {
  return (
    <GroupLayout>
      <View style={{ flex: 1 }}>
        {groups.length > 0 && <GroupList groups={groups} />}
      </View>
      <FloatingFab screen={ExpensesComponent.AddExpensePeople} />
    </GroupLayout>
  );
};

export default GroupContent;

const styles = StyleSheet.create({});
