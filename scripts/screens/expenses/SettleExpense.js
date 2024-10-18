import { Animated, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Button, Chip } from "react-native-paper";
import { getExpenseSplits } from "../../sql/expense/expense-manager";
import { useAuth } from "../../context/AuthProvider";
const UserInvolved = (props) => {
  const {
    user: { id },
  } = useAuth();
  const isUserThePayer = id === props.data.user_id;
  return (
    <View style={{ borderWidth: 1, marginVertical: 10, padding: 10 }}>
      <Text>{JSON.stringify(props.data)}</Text>
      <Button onPress={() => console.log("Settle Amount")}>
        {isUserThePayer ? "Settle Amount" : "Settle Amount For Them"}
      </Button>
    </View>
  );
};
const SettleExpense = () => {
  const isSettled = false;
  const nav = useNavigation();
  const [peopleInvolved, setPeopleInvolved] = useState([]);
  const {
    params: { data },
  } = useRoute();
  useLayoutEffect(() => {
    nav.setOptions({ title: data.description });
    getExpenseSplits(data.expense_id)
      .then((res) => setPeopleInvolved(res))
      .catch((err) => console.log(err));
  }, []);
  return (
    <View>
      <Text>{JSON.stringify(data)}</Text>
      <View>
        <Chip style={{ width: 200 }}>
          {isSettled ? "Settled" : "Unsettled"}
        </Chip>
      </View>
      <View
        style={{ borderWidth: 2, flexDirection: "row", alignItems: "center" }}
      >
        <Icon name="calendar" size={30} />
        <Text>{new Date(data.created_at).toDateString() + "   "}</Text>
        <Text>{new Date(data.created_at).toLocaleTimeString()}</Text>
      </View>
      {peopleInvolved.length > 0 && (
        <Animated.FlatList
          data={peopleInvolved}
          renderItem={(item) => <UserInvolved data={item.item} />}
        />
      )}
    </View>
  );
};

export default SettleExpense;

const styles = StyleSheet.create({});
