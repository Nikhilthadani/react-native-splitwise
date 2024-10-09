import { StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { FAB } from "react-native-paper";

const FloatingFab = ({ screen }) => {
  const nav = useNavigation();
  return (
    <FAB
      onPress={() => nav.navigate(screen)}
      icon={"arrow-right"}
      style={{
        margin: 16,
        right: 0,
        bottom: 0,
        position: "absolute",
      }}
    />
  );
};

export default FloatingFab;

const styles = StyleSheet.create({});
