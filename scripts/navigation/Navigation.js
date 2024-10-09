import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { BottomTabScreens } from "../utils/constants";
import ActivityScreen from "../screens/ActivityScreen";
import AccountScreen from "../screens/AccountScreen";
import Icon from "react-native-vector-icons/Feather";
import GroupStackNavigator from "./group/stack-navigator";
import { useAuth } from "../context/AuthProvider";
import LoginStackNavigator from "./auth/stack-nav";
import FriendsStackNavigator from "./friends/stack-navigator";
const Tab = createMaterialBottomTabNavigator();

export default function Navigator() {
  const auth = useAuth();
  if (!auth.isLoggedIn) {
    return (
      <NavigationContainer>
        <LoginStackNavigator />
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="users">
        <Tab.Screen
          options={{
            tabBarIcon: (props) => <Icon {...props} name={"users"} size={20} />,
          }}
          name={BottomTabScreens.Groups}
          component={GroupStackNavigator}
        />
        <Tab.Screen
          options={{
            tabBarIcon: (props) => <Icon {...props} name={"user"} size={20} />,
          }}
          name={BottomTabScreens.Friends}
          component={FriendsStackNavigator}
        />
        <Tab.Screen
          options={{
            tabBarIcon: (props) => (
              <Icon {...props} name={"activity"} size={20} />
            ),
          }}
          name={BottomTabScreens.Activity}
          component={ActivityScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: (props) => (
              <Icon {...props} name={"package"} size={20} />
            ),
          }}
          name={BottomTabScreens.Account}
          component={AccountScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
