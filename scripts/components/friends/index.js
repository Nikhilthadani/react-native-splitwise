import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FriendsLayout from "./FriendsLayout";
import FriendsList from "./FriendsList";

const AllFriends = () => {
  return (
    <View style={{ flex: 1 }}>
      <FriendsLayout>
        <FriendsList />
      </FriendsLayout>
    </View>
  );
};

export default AllFriends;

const styles = StyleSheet.create({});
