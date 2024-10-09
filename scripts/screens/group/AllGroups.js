import React, { useEffect, useState } from "react";
import GroupContent from "../../components/group";

import { getAllGroupsOfUser } from "../../sql/group";
import { useAuth } from "../../context/AuthProvider";
import { View } from "react-native";
import { ExpensesComponent } from "../../utils/constants";
import FloatingFab from "../../components/fab/FloatingFab";

const AllGroups = ({ navigation }) => {
  const auth = useAuth();
  const [groups, setGroups] = useState([]);
  const fetchGroups = async () => {
    if (auth && auth.user && auth.user.id)
      await getAllGroupsOfUser(auth.user.id)
        .then((d) => setGroups(d))
        .catch(() => setGroups([]));
  };
  useEffect(() => {
    navigation.addListener("focus", () => {
      fetchGroups();
    });
  }, [auth, navigation]);
  return (
    <View style={{ flex: 1 }}>
      <GroupContent groups={groups} />
      <FloatingFab screen={ExpensesComponent.AddExpenseGroup} />
    </View>
  );
};

export default AllGroups;
