import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { getFriendsOfUser } from "../../sql/friend/get";
import { useNavigation } from "@react-navigation/native";
import { FriendsComponent } from "../../utils/constants";
import SelectContacts from "./SelectContacts";
import { Button } from "react-native-paper";

const FriendsList = () => {
  const navigation = useNavigation();

  const {
    user: { id },
  } = useAuth();
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    getFriendsOfUser(id)
      .then((data) => setFriends(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <View>
      {friends.length > 0 && (
        <FlatList
          data={friends}
          renderItem={(data) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(FriendsComponent.FriendPage, { id })
              }
              style={{
                paddingVertical: 20,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderRadius: 20,
                marginVertical: 20,
                marginHorizontal: 10,
              }}
            >
              <Text>{data?.item?.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default FriendsList;

const styles = StyleSheet.create({});
