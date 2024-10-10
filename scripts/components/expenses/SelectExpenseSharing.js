import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { getAllGroupsOfUser } from "../../sql/group";
import { useAuth } from "../../context/AuthProvider";
import SelectContacts from "../friends/SelectContacts";
import { Dropdown } from "react-native-element-dropdown";

const SelectExpenseSharing = ({ onSelectValue }) => {
  const [selectedValue, setSelectedValue] = useState();
  const [groupValue, setGroupValue] = useState();
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
            onChange={(e) => setSelectedValue(e.group_id)}
          />
        )}
        {view == 1 && (
          <SelectContacts
            onSelectContacts={(v) => setSelectedValue(JSON.stringify(v))}
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
