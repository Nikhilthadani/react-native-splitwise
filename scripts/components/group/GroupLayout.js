import { StyleSheet, View } from "react-native";
import React from "react";

const GroupLayout = ({ children }) => {
  return (
    <View style={styles.container}>
      <View>{children}</View>
    </View>
  );
};

export default GroupLayout;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
