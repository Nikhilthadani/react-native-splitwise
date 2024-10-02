import React, { useEffect } from "react";
import GroupContent from "../../components/group";
import { getAllTables } from "../../sql/executer";

const AllGroups = () => {
  useEffect(() => {
    getAllTables();
  }, []);
  return <GroupContent />;
};

export default AllGroups;
