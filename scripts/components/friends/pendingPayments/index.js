import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getPendingPaymentsOfUser } from "../../../sql/payments/pending-payments";
import { useAuth } from "../../../context/AuthProvider";
import PendingExpenseItem from "./PendingExpenseItem";

const PendingPayments = () => {
  const [pendingPayments, setPendingPayments] = useState([]);
  const {
    user: { id },
  } = useAuth();
  useEffect(() => {
    getPendingPaymentsOfUser(id)
      .then((res) => setPendingPayments(res))
      .catch((err) => console.log(err));
  }, []);
  return (
    <View>
      <Text>PendingPayments</Text>
      {pendingPayments && (
        <View style={{ borderWidth: 1, padding: 5 }}>
          <Text>{JSON.stringify(pendingPayments)}</Text>
          {pendingPayments.map((p) => (
            <PendingExpenseItem {...p} />
          ))}
        </View>
      )}
    </View>
  );
};

export default PendingPayments;

const styles = StyleSheet.create({});
