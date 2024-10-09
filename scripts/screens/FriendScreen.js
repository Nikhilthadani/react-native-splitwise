import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Touchable,
  TouchableHighlight,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { getFriendsOfUser } from "../sql/friend/get";
import { useAuth } from "../context/AuthProvider";

const FriendScreen = () => {
  const [friends, setFriends] = useState([]);
  const {
    user: { id },
  } = useAuth();
  useLayoutEffect(() => {
    getFriendsOfUser(id).then((d) => setFriends(d));
  }, []);
  console.log(friends);

  return (
    <View>
      {friends.length === 0 && <Text>NO FRIENDS</Text>}
      {friends.length > 0 && (
        <FlatList
          data={friends}
          renderItem={(data) => (
            <TouchableHighlight
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
            </TouchableHighlight>
          )}
        />
      )}
      {/* {friends.length > 0 && (
        <FlatList
          data={friends}
          renderItem={(info) => (
            <View>
              <Text>{"JSON.stringify(info.item)"}</Text>
            </View>
          )}
        />
      )} */}
    </View>
  );
};

export default FriendScreen;

const styles = StyleSheet.create({});
