import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../screens/login/Login";
import SignUp from "../../screens/signup/Sigbup";

const Stack = createNativeStackNavigator();
const LoginStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name={"Login"}
        component={Login}
      ></Stack.Screen>
      <Stack.Screen
        options={{ headerShown: false }}
        name={"Signup"}
        component={SignUp}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default LoginStackNavigator;
