import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ExpensesComponent } from "../../utils/constants";
import AddExpense from "../../screens/expenses/AddExpenseGroup";

const Stack = createNativeStackNavigator();
const ExpenseStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name={ExpensesComponent.AddExpense}
        component={AddExpense}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default ExpenseStackNavigator;
