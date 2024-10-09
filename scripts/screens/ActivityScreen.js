import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { getActivitiies } from "../sql/executer";

const ActivityScreen = () => {
  useEffect(() => {
    setTimeout(() => {
      getActivitiies();
    }, 1200);
  }, []);
  return (
    <View>
      <Text>ActivityScreen</Text>
    </View>
  );
};

export default ActivityScreen;

const styles = StyleSheet.create({});
