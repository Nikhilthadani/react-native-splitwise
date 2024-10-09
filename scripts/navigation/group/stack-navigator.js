import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ExpensesComponent, GroupComponents } from "../../utils/constants";
import AllGroups from "../../screens/group/AllGroups";
import GroupItem from "../../screens/group/GroupItem";
import CreateGroupScreen from "../../screens/group/CreateGroupScreen";
import { useNavigation } from "@react-navigation/native";
import GroupMembers from "../../screens/group/GroupMembers";
import AddExpenseGroup from "../../screens/expenses/AddExpenseGroup";
import FloatingFab from "../../components/fab/FloatingFab";
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
      <Stack.Screen
        name={GroupComponents.GroupMembers}
        component={GroupMembers}
      ></Stack.Screen>
      <Stack.Screen
        name={ExpensesComponent.AddExpenseGroup}
        component={AddExpenseGroup}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default GroupStackNavigator;
