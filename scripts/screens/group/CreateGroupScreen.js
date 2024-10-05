import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button, IconButton, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthProvider";
import { createGroup } from "../../sql/group";

const CreateGroupScreen = () => {
  const { user } = useAuth();
  console.log(user);

  const [groupName, setGroupName] = useState("");
  const navigation = useNavigation();
  const SCREEN_OPTIONS = {
    headerRight: (props) => (
      <Button
        mode="text"
        {...props}
        onPress={async () => await createANewGroup()}
      >
        Done
      </Button>
    ),
    headerLeft: (props) => (
      <IconButton icon={"close"} onPress={() => navigation.goBack()} {...props}>
        Done
      </IconButton>
    ),
    headerShadowVisible: false,
  };
  const createANewGroup = async () => {
    try {
      console.log(groupName);
      if (!groupName) return;

      const result = await createGroup(groupName, user.id);
      console.log("RESULT OF CREATE_GROUP_SCREEN", result);
      alert("Created new group!!!");
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };
  useLayoutEffect(() => {
    navigation.setOptions(SCREEN_OPTIONS);
  }, [navigation, SCREEN_OPTIONS, createANewGroup]);
  console.log(groupName); // For debugging to see groupName changes

  return (
    <View style={styles.container}>
      <View style={styles.groupDetails}>
        <View
          style={{
            borderTopWidth: 2,
            borderBottomWidth: 2,
            borderLeftWidth: 2,
            borderRightWidth: 2,
            borderRadius: 10,
            borderColor: "green",
            padding: 3,
          }}
        >
          <Icon name="add-photo-alternate" size={30} />
        </View>
        <View style={{ width: 300 }}>
          <TextInput
            onChangeText={setGroupName}
            mode="flat"
            value={groupName}
            placeholder="Group Name"
            style={{ fontSize: 20 }}
          />
        </View>
      </View>
      <Button onPress={createANewGroup}>OK</Button>
    </View>
  );
};

export default CreateGroupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  groupDetails: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
  },
});
