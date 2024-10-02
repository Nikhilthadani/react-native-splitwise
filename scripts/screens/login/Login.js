import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { useAuth } from "../../context/AuthProvider";

const Login = ({ navigation }) => {
  const [id, setId] = useState();
  const auth = useAuth();
  const handleSubmit = () => {
    console.log(id);
    auth.login(+id);
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ marginBottom: 20, marginTop: 10, fontSize: 40 }}>
        Login Or Register
      </Text>
      <TextInput
        style={{ height: 50, width: Dimensions.get("window").width - 100 }}
        value={id}
        onChangeText={(e) => setId(Number(e))}
      />
      <Button onPress={handleSubmit}>Login</Button>
      <View>
        <Text>New user?</Text>
        <Button onPress={() => navigation.navigate("Signup")}>Signup</Button>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
