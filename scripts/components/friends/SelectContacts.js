import { StyleSheet, View } from "react-native";
import MultiSelect from "react-native-multiple-select";
import { Button, FAB } from "react-native-paper";
import React, { useEffect, useState } from "react";
import * as Contacts from "expo-contacts";

const SelectContacts = ({ onSelectContacts, showFab }) => {
  const [contacts, setContacts] = useState();
  const [selectedItems, setselectedItems] = useState([]);
  const addNewFriend = async () => {
    console.log(selectedItems);
    onSelectContacts(selectedItems);
    // await addFriend(selectedItems[0], auth.user.id);
  };

  useEffect(() => {
    async function getPermissions() {
      const { status, granted, canAskAgain } =
        await Contacts.requestPermissionsAsync();
      if (status !== "granted") {
        alert("NOT GRANTED");
        if (canAskAgain) {
          const rePermsisions = await Contacts.requestPermissionsAsync();
          if (!rePermsisions.granted) {
            return;
          } else {
            const contacts = await Contacts.getContactsAsync({
              fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
            });
            setContacts(contacts);
          }
        }
      } else {
        const contacts = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
        });
        setContacts(contacts.data);
      }
    }
    getPermissions();
  }, []);

  return (
    contacts &&
    contacts?.length > 0 && (
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
            submitButtonColor="green"
            submitButtonText="Submit"
            styleRowList={{ borderWidth: 1, paddingVertical: 10 }}
          />
        </View>
        {showFab ? (
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
        ) : (
          <Button onPress={addNewFriend}>Send</Button>
        )}
      </View>
    )
  );
};

export default SelectContacts;

const styles = StyleSheet.create({});
