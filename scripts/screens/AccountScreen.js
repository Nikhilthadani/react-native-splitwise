import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { useAuth } from "../context/AuthProvider";

const AccountScreen = () => {
  const auth = useAuth();
  console.log(auth);

  return (
    <View>
      <Text>AccountScreen</Text>
      <Text>{JSON.stringify(auth.user)}</Text>
      <Button onPress={auth.logout}>LOGOUT</Button>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({});
