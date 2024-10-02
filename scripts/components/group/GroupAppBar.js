import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { GroupComponents } from "../../utils/constants";

const GroupAppBar = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Appbar.Header
        style={{ backgroundColor: "transparent", marginLeft: "auto" }}
      >
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action
          icon="account-multiple-plus-outline"
          onPress={() => navigation.navigate(GroupComponents.AddGroup)}
        />
      </Appbar.Header>
    </View>
  );
};

export default GroupAppBar;

const styles = StyleSheet.create({});
