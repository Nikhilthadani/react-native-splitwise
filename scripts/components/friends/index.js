import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FriendsLayout from "./FriendsLayout";
import FriendsList from "./FriendsList";
import FloatingFab from "../fab/FloatingFab";
import { ExpensesComponent } from "../../utils/constants";
import PendingPayments from "./pendingPayments";

const AllFriends = () => {
  return (
    <View style={{ flex: 1 }}>
      <FriendsLayout>
        <PendingPayments />
        <FriendsList />
      </FriendsLayout>
      <FloatingFab
        screen={ExpensesComponent.AddExpensePeople}
        arrowIcon={"note"}
      />
    </View>
  );
};

export default AllFriends;

const styles = StyleSheet.create({});
