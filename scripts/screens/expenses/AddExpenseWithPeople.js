import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import SelectExpenseSharing from "../../components/expenses/SelectExpenseSharing";
import { Button, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";

const AddExpenseWithPeople = () => {
  const [amount, setAmount] = useState(0);
  const [expenseDescription, setExpenseDescription] = useState("");
  const setExpenseDetails = (e) => {
    setExpenseDescription(e);
  };
  const setExpenseAmount = (e) => {
    setAmount(e);
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <SelectExpenseSharing />
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
        <Button onPress={() => {}}>Add Expense</Button>
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
