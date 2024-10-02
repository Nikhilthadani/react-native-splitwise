import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GroupComponents } from "../../utils/constants";
import AllGroups from "../../screens/group/AllGroups";
import GroupItem from "../../screens/group/GroupItem";
import { Button, IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/Feather";
import { View } from "react-native";
import CreateGroupScreen from "../../screens/group/CreateGroupScreen";
import { useNavigation } from "@react-navigation/native";
const Stack = createNativeStackNavigator();
const GroupStackNavigator = () => {
  const nav = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name={GroupComponents.AllGroups}
        component={AllGroups}
      ></Stack.Screen>
      <Stack.Screen
        name={GroupComponents.GroupItem}
        component={GroupItem}
      ></Stack.Screen>
      <Stack.Screen
        name={GroupComponents.AddGroup}
        component={CreateGroupScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default GroupStackNavigator;
