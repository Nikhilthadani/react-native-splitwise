import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { getUserById } from "../../../sql/executer";
import { useNavigation } from "@react-navigation/native";
import { ExpensesComponent } from "../../../utils/constants";
const PendingExpenseItem = (props) => {
  const nav = useNavigation();
  const [paidBy, setPaidBy] = useState(null);
  const [payer, setPayer] = useState(null);

  useLayoutEffect(() => {
    getUserById(props.paid_by)
      .then((res) => setPaidBy(res))
      .catch((err) => console.log(err));
    getUserById(props.payer_id)
      .then((res) => setPayer(res))
      .catch((err) => console.log(err));
  }, []);
  const moveToSettleScreen = () => {
    nav.navigate(ExpensesComponent.SettleExpense, { data: { ...props } });
    return;
  };
  return (
    <TouchableOpacity
      onPress={moveToSettleScreen}
      style={{
        backgroundColor: "#fefefe",
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderRadius: 10,
        elevation: 10,
      }}
    >
      <Text>{props.description}</Text>
      <Text>{props.amount}</Text>
      <Text>Paid By UserId {paidBy?.name}</Text>
      <Text>
        You owe {payer?.name} ${props.amount_owed}
      </Text>
    </TouchableOpacity>
  );
};

export default PendingExpenseItem;

const styles = StyleSheet.create({});
