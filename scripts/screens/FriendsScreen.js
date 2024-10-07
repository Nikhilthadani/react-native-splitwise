import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as Contacts from "expo-contacts";

const FriendsScreen = () => {
  const [contacts, setContacts] = useState();
  useEffect(() => {
    async function getPermissions() {
      if (Contacts.PermissionStatus.GRANTED) {
        alert("GRANTED");
        const contacts = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
        });
        setContacts(contacts);
        return;
      }
      const { status, granted, canAskAgain } =
        await Contacts.requestPermissionsAsync();
      if (status !== "granted") {
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
        setContacts(contacts);
      }
    }
    getPermissions();
  }, []);
  console.log(contacts?.data?.[0]);

  return (
    <View>
      <Text>FriendsScreen</Text>
    </View>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({});
