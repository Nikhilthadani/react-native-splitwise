import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { useAuth } from "../../context/AuthProvider";

const SignUp = ({ navigation }) => {
  const auth = useAuth();
  const [email, setEmail] = useState();
  const [name, setName] = useState();

  const handleSubmit = async () => {
    await auth.signUp(name, email);
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput
        placeholder="Name"
        style={{ height: 50, width: Dimensions.get("window").width - 100 }}
        value={name}
        onChangeText={(e) => setName(e)}
      />
      <TextInput
        style={{ height: 50, width: Dimensions.get("window").width - 100 }}
        value={email}
        onChangeText={(e) => setEmail(e)}
      />
      <Button onPress={handleSubmit}>Signup</Button>
      <View>
        <Text>Already a user?</Text>
        <Button onPress={() => navigation.navigate("Login")}>Login</Button>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
