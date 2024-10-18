import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Card } from "react-native-paper";
import { useAuth } from "../../context/AuthProvider";

const FriendExpenseDetails = ({ expense }) => {
  const {
    user: { id },
  } = useAuth();
  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default FriendExpenseDetails;

const styles = StyleSheet.create({});
