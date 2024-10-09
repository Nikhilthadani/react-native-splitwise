import { StyleSheet, View } from "react-native";
import MultiSelect from "react-native-multiple-select";
import { FAB } from "react-native-paper";
import React, { useState } from "react";
import { addFriend } from "../../sql/friend/add";
import { useAuth } from "../../context/AuthProvider";
const SelectContacts = ({ contacts }) => {
  const auth = useAuthr();
  const [selectedItems, setselectedItems] = useState([]);
  console.log(selectedItems);
  const addNewFriend = async () => {
    console.log(selectedItems);
    await addFriend(selectedItems[0], auth.user.id);
  };
  return (
    contacts && (
      // <FlatList
      //   style={{ paddingTop: 10, paddingHorizontal: 10 }}
      //   data={contacts}
      //   renderItem={(item) => <RenderItem {...item.item} />}
      // />
      <View
        style={{
          paddingVertical: 10,
          flex: 1,
          paddingHorizontal: 10,
        }}
      >
        <View style={{ marginVertical: 10 }}>
          <MultiSelect
            items={contacts}
            styleDropdownMenu={{ borderBottomWidth: 1 }}
            uniqueKey="id"
            selectedItems={selectedItems}
            onSelectedItemsChange={(items) => setselectedItems(items)}
            searchInputStyle={{ color: "#CCC" }}
            submitButtonColor="#CCC"
            submitButtonText="Submit"
            styleRowList={{ borderWidth: 1, paddingVertical: 10 }}
          />
        </View>
        <FAB
          onPress={addNewFriend}
          icon={"arrow-right"}
          style={{
            margin: 16,
            right: 0,
            bottom: 0,
            position: "absolute",
          }}
        />
      </View>
    )
  );
};

export default SelectContacts;

const styles = StyleSheet.create({});
