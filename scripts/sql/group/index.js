import * as SQLite from "expo-sqlite";

export const groupCreateQuery = `INSERT INTO groups ( group_name, created_by ) VALUES(?,?)`;
export const groupMemberCreateQuery = `INSERT INTO group_members ( group_id, user_id ) VALUES(?,?)`;

export const createNewGroup = async (db, name, userId) => {
  try {
    const result = await db.runAsync(groupCreateQuery, name, userId);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const createGroupMember = async (db, groupId, userId) => {
  try {
    const result = await db.runAsync(groupMemberCreateQuery, groupId, userId);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createGroup = async (groupName, userId) => {
  let db;
  try {
    db = await SQLite.openDatabaseAsync("test.db");
    db.execAsync("BEGIN");
    //////////////////////////////
    console.log("TXN Started");

    const newGroup = await createNewGroup(db, groupName, userId);
    console.log("TXN>>> new group id", newGroup.lastInsertRowId);

    const groupMember = await createGroupMember(
      db,
      newGroup.lastInsertRowId,
      userId
    );
    console.log("TXN>>> Group member created id", groupMember.lastInsertRowId);

    console.log("TXN Ended");

    //////////////////////////////
    await db.execAsync("COMMIT");
    console.log("Transaction completed and committed successfully");
  } catch (error) {
    await db.execAsync("ROLLBACK");
    console.error("Transaction failed and was rolled back:", error);
  } finally {
    await db.closeAsync();
  }
};

export const getAllGroupsOfUser = async (userId) => {
  let db;
  try {
    db = await SQLite.openDatabaseAsync("test.db");
    const query = `SELECT * 
FROM groups g 
INNER JOIN group_members gm 
ON g.id = gm.group_id 
WHERE gm.user_id = ?;`;

    const res = await db.getAllAsync(query, userId);
    console.log("RESULT of FINDING GROUPS", res);

    return res;
  } catch (err) {
    console.log("Error while getting groups: ", err);
    throw err;
  } finally {
    await db.closeAsync();
  }
};
