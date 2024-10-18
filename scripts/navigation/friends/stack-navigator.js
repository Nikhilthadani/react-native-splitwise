import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllGroups from "../../screens/group/AllGroups";
import GroupItem from "../../screens/group/GroupItem";
import { Button, IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/Feather";
import { View } from "react-native";
import CreateGroupScreen from "../../screens/group/CreateGroupScreen";
import { useNavigation } from "@react-navigation/native";
import GroupMembers from "../../screens/group/GroupMembers";
import { ExpensesComponent, FriendsComponent } from "../../utils/constants";
import AllFriends from "../../components/friends";
import SelectContacts from "../../components/friends/SelectContacts";
import FriendPage from "../../screens/friend/FriendPage";
import AddExpenseWithPeople from "../../screens/expenses/AddExpenseWithPeople";
import SettleExpense from "../../screens/expenses/SettleExpense";
const Stack = createNativeStackNavigator();
const FriendsStackNavigator = () => {
  const nav = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name={FriendsComponent.AllFriends}
        component={AllFriends}
      ></Stack.Screen>
      <Stack.Screen
        name={FriendsComponent.AddFriend}
        component={SelectContacts}
      ></Stack.Screen>
      <Stack.Screen
        name={FriendsComponent.FriendPage}
        component={FriendPage}
      ></Stack.Screen>
      <Stack.Screen
        name={ExpensesComponent.AddExpensePeople}
        component={AddExpenseWithPeople}
      ></Stack.Screen>
      <Stack.Screen
        name={ExpensesComponent.SettleExpense}
        component={SettleExpense}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default FriendsStackNavigator;
