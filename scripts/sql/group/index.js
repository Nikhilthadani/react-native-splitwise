import Connection from "../login/AuthOperations";

export const groupCreateQuery = `INSERT INTO groups (group_name, created_by) VALUES(?,?)`;
export const groupMemberCreateQuery = `INSERT INTO group_members ( group_id, user_id ) VALUES(?,?)`;

const createNewGroup = async (db, name, userId) => {
  console.log("CREATING GROUP with name", name, "user", userId);

  try {
    alert("OHHHHH");
    const result = await db.runAsync(groupCreateQuery, name, userId);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const createGroupMember = async (db, groupId, userId) => {
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
    db = await Connection.getConnection();
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
  }
};

export const getAllGroupsOfUser = async (userId) => {
  let db;
  try {
    db = await Connection.getConnection();
    const query = `SELECT * 
FROM groups g 
INNER JOIN group_members gm 
ON g.id = gm.group_id 
WHERE gm.user_id = ?;`;
    console.log("FINDING GROUPS OF USER->", userId);
    const res = await db.getAllAsync(query, userId);
    console.log("RESULT of FINDING GROUPS", res);

    return res;
  } catch (err) {
    console.log("Error while getting groups: ", err);
    throw err;
  }
};
