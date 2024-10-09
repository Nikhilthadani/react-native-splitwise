import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { FriendsComponent } from "../../utils/constants";

const FriendsAppBar = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Appbar.Header
        style={{ backgroundColor: "transparent", marginLeft: "auto" }}
      >
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action
          icon="account-plus-outline"
          onPress={() => navigation.navigate(FriendsComponent.AddFriend)}
        />
      </Appbar.Header>
    </View>
  );
};

export default FriendsAppBar;

const styles = StyleSheet.create({});
