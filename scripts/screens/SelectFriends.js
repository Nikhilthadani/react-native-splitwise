import { StyleSheet, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import * as Contacts from "expo-contacts";
import SelectContacts from "../components/group/friends/SelectContacts";

const SelectFriends = () => {
  const [contacts, setContacts] = useState();
  useLayoutEffect(() => {
    async function getPermissions() {
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
      alert("OK");
    }
    getPermissions();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      {/* <View>
   {   contacts?.data?.length > 0 && <SelectContacts contacts={contacts.data} />}
      </View> */}
    </View>
  );
};

export default SelectFriends;

const styles = StyleSheet.create({});
