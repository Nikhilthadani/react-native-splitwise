import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { getAllGroupsOfUser } from "../../sql/group";
import { useAuth } from "../../context/AuthProvider";
import SelectContacts from "../friends/SelectContacts";
import { Dropdown } from "react-native-element-dropdown";
const VALUES = { contacts: "contacts", group: "group" };
const SelectExpenseSharing = ({ onSelectValue }) => {
  const [selectedValue, setSelectedValue] = useState();
  const {
    user: { id },
  } = useAuth();
  const [view, setView] = useState(0);
  const [groups, setGroups] = useState([]);
  const getGroups = async () => {
    const userGroups = await getAllGroupsOfUser(id);
    if (userGroups.length > 0) setGroups(userGroups);
  };
  const switchView = async () => {
    if (view === 0) {
      // view change
      setView(1);
      selectedValue(null);
    }
    await getGroups();
    setView(0);
  };
  const handleValueChange = (value, type) => {
    if (type === VALUES.contacts) {
      setSelectedValue(value);
      onSelectValue({ contacts: value });
    } else {
      setSelectedValue(value);
      onSelectValue({ groupId: value });
    }
  };
  // on click change to friends
  // on click again change to first group
  return (
    <View style={{ width: "100%" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text onPress={switchView}>Splitting bill with: </Text>
        {view == 0 && groups.length === 1 && (
          <TextInput style={{ width: 200 }} value={groups[0].group_name} />
        )}
        {view == 0 && groups.length > 1 && (
          <Dropdown
            value={selectedValue ?? ""}
            labelField="group_name"
            valueField="group_id"
            data={groups}
            maxHeight={300}
            style={{ width: 300 }}
            onChange={(e) => handleValueChange(e.group_id, VALUES.group)}
          />
        )}
        {view == 1 && (
          <SelectContacts
            onSelectContacts={(v) => handleValueChange(v, VALUES.contacts)}
            renderLeftIcon={() => <Button icon={"save"}></Button>}
          />
        )}
      </View>
      <View>
        <Text>SelectedValue: {String(selectedValue)}</Text>
      </View>
    </View>
  );
};

export default SelectExpenseSharing;

const styles = StyleSheet.create({});
