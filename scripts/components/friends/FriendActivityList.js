import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAuth } from "../../context/AuthProvider";
function calculateWhoLent(currentUserId, amount_owed, payer_id, payee_id) {
  if (payee_id == currentUserId) {
    return `You lent \n ${Number(amount_owed).toFixed(2)}`;
  } else {
    return `You owe \n ${amount_owed}`;
  }
}
const FriendActivityList = ({ activity }) => {
  const {
    user: { id },
  } = useAuth();
  return (
    <FlatList
      data={activity}
      renderItem={(d) => (
        <View style={styles.itemCont}>
          <Text style={styles.text}>
            {new Date(d.item.payment_date).toDateString()}
          </Text>
          <Text style={styles.text}>
            Group:{d.item.group_id ?? d.item.description}
          </Text>
          <Text style={styles.text}>
            {calculateWhoLent(
              id,
              d.item.amount_owed,
              d.item.payer_id,
              d.item.payee_id
            )}
          </Text>
        </View>
      )}
    />
  );
};

export default FriendActivityList;

const styles = StyleSheet.create({
  itemCont: {
    width: Dimensions.get("window").width - 10,
    flexDirection: "row",
    flex: 1,
    marginVertical: 10,
    gap: 10,
    justifyContent: "space-between",
    borderBottomWidth: 1,
  },
  text: {},
});
