import { StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";

const FloatingFab = ({ screen, arrowIcon }) => {
  const nav = useNavigation();
  return (
    <Button
      mode="elevated"
      onPress={() => nav.navigate(screen)}
      icon={arrowIcon ?? "arrow-right"}
      style={{
        margin: 16,
        right: 0,
        bottom: 0,
        position: "absolute",
        borderRadius: 10,
      }}
    >
      Add Expense
    </Button>
  );
};

export default FloatingFab;

const styles = StyleSheet.create({});
