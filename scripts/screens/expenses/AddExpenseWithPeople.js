import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import SelectExpenseSharing from "../../components/expenses/SelectExpenseSharing";
import { Button, Switch, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { addExpense } from "../../sql/expense/add-expense";
import { useAuth } from "../../context/AuthProvider";
const SPLIT_TYPE = { PERCENTAGE: "PERCENTAGE", EQUALLY: "EQUALLY" };
const AddExpenseWithPeople = () => {
  const [switchOn, setSwitchOn] = useState(false);
  const [amount, setAmount] = useState(0);
  const [expenseDescription, setExpenseDescription] = useState("");
  const [exenseSharing, setExenseSharing] = useState();
  const {
    user: { id },
  } = useAuth();
  const setExpenseDetails = (e) => {
    setExpenseDescription(e);
  };
  const setExpenseAmount = (e) => {
    setAmount(e);
  };
  const onSelectingValue = (value) => {
    if (value?.groupId) {
      console.log("SELECTED GROUP-->>", value);
    } else if (value.contacts) {
      console.log("SELECTED CONTACTS-->>", value);
    }
  };

  const adExpenseHandler = async () => {
    console.log("Details: ", { exenseSharing, expenseDescription, amount });
    try {
      const numOfPeople = exenseSharing.contacts.length + 1;
      const sharePerUser = Number(+amount / +numOfPeople);
      alert(sharePerUser);
      const res = addExpense(
        exenseSharing.contacts,
        sharePerUser,
        expenseDescription,
        amount,
        id,
        null
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ flexDirection: "row" }}>
        <Text>{`Split Bill ${switchOn ? "Percentage" : "Equally"}`}</Text>
        <Switch value={switchOn} onValueChange={setSwitchOn} />
      </View>
      <SelectExpenseSharing onSelectValue={setExenseSharing} />
      <View style={{ width: 300, gap: 20 }}>
        <View style={styles.inputBox}>
          <Icon name="receipt" size={30} />
          <TextInput
            id="descriptiom"
            onChangeText={setExpenseDescription}
            mode="flat"
            value={expenseDescription}
            placeholder="Descriptiom"
            style={styles.inputStyle}
          />
        </View>
        <View style={styles.inputBox}>
          <Icon name="currency-rupee" size={30} />
          <TextInput
            keyboardType="decimal-pad"
            id="amount"
            onChangeText={setAmount}
            mode="flat"
            value={amount}
            placeholder="Amount"
            style={styles.inputStyle}
          />
        </View>
        <Button onPress={adExpenseHandler}>Add Expense</Button>
      </View>
    </View>
  );
};

export default AddExpenseWithPeople;

const styles = StyleSheet.create({
  inputBox: {
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
    marginVertical: 10,
  },
  inputStyle: {
    fontSize: 20,
    backgroundColor: "transparent",
    width: "80%",
  },
});
