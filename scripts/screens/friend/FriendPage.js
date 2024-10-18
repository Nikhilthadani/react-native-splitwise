import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useAuth } from "../../context/AuthProvider";
import { getFriendsSettlementHistory } from "../../sql/expense/get-expense";
import FriendActivityList from "../../components/friends/FriendActivityList";
import { Button } from "react-native-paper";

const FriendPage = () => {
  const [activity, setActivity] = useState([]);
  const { user } = useAuth();
  const { params } = useRoute();

  useEffect(() => {
    getFriendsSettlementHistory(user.id, params.id)
      .then((data) => {
        console.log(data);
        setActivity(data);
      })
      .catch((err) => console.log(err));
  }, []);
  const settleAmount = () => {
    
  }
  return (
    <View>
      <Text>CurrenrtUser: {user.id}</Text>
      <Text>OtherUser: {params.id}</Text>
      <Button onPress={settleAmount}>Settle</Button>
      <FriendActivityList activity={activity} />
    </View>
  );
};

export default FriendPage;

const styles = StyleSheet.create({});
