import {
  UsersTable,
  ExpenseSplitsTable,
  ExpensesTable,
  GroupMembersTable,
  GroupsTable,
  PaymentsTable,
  SessionTable,
  ActivityTable,
  FriendsTable,
} from "./tables";
import Connection from "./login/AuthOperations";
export const executeSqlCreateTables = async () => {
  let db;
  try {
    db = await Connection.getConnection();
    await db.execAsync(UsersTable);
    await db.execAsync(GroupsTable);
    await db.execAsync(GroupMembersTable);
    await db.execAsync(ExpensesTable);
    await db.execAsync(ExpenseSplitsTable);
    await db.execAsync(PaymentsTable);
    await db.execAsync(SessionTable);
    await db.execAsync(ActivityTable);
    await db.execAsync(FriendsTable);
    await getAllTables();
    console.log("Created all tables 🎉");
  } catch (error) {
    console.log("Error connecting to SQite");
    throw error;
  }
};

const deleteGroups = async () => {
  let db;
  try {
    db = await Connection.getConnection();
    await db.execAsync("DELETE FROM groups; DELETE from group_members;");

    console.log("DELETE ALL GROUPS  🎉");
  } catch (error) {
    console.log("Error connecting to SQite");
    throw error;
  }
};
const getActivitiies = async () => {
  try {
    const db = await Connection.getConnection();
    const activities = await db.getAllAsync("SELECT * FROM activity");
    const friends = await db.getAllAsync("SELECT * FROM friends");

    console.log("activities all >>", activities);
    console.log("friends all >>", friends);
  } catch (error) {
    console.log("Error connecting to SQite", error);
    throw error;
  }
};
async function getAllTables() {
  let db;
  try {
    db = await Connection.getConnection();
    const result = await db.getAllAsync(
      "SELECT name FROM sqlite_master WHERE type = 'table';"
    );
    console.log(JSON.stringify(result));
  } catch (error) {
    throw err;
  }
}
async function getUserById(id) {
  try {
    const db = await Connection.getConnection();
    const result = await db.getFirstAsync(
      "SELECT name,phone,id from users where id = ?;",
      [id]
    );
    console.log("RESULT of getUserById", result);
    return result;
  } catch (error) {
    throw error;
  }
}
async function getAllUsers() {
  let db;
  try {
    db = await Connection.getConnection();
    const result = await db.getAllAsync("SELECT * FROM users");
    for (const row of result) {
      console.log(row.id, row.value, row.intValue);
    }
    console.log(result);
    return result[0];
  } catch (error) {
    console.log(error);

    throw error;
  }
}

/**
 * add registered = 0 if user added from different user
 */
async function createUser(name, email, registertd = 1) {
  let db;
  try {
    console.log(name, email);

    db = await Connection.getConnection();
    const result = await db.runAsync(
      "INSERT INTO users ( name , phone, is_registered) VALUES (?,?,?)",
      name,
      email,
      registertd
    );
    console.log(result.lastInsertRowId);

    return await db.getFirstAsync(
      "SELECT name,phone,id from users where id = ?;",
      [result.lastInsertRowId]
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const executeAnyQueryWithParams = async (query, ...params) => {
  let db;
  try {
    console.log("Executing: ", query, "with params: ", params);

    db = await Connection.getConnection();
    const result = await db.runAsync(query, ...params);
    console.log(result.lastInsertRowId);

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

async function checkSession() {
  let db;
  try {
    db = await Connection.getConnection();
    const result = await db.getAllAsync("SELECT * FROM session");
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function deleteAllSession() {
  let db;
  try {
    db = await Connection.getConnection();
    const result = await db.getAllAsync("DELETE FROM session");
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function createSession(userId) {
  let db;
  try {
    db = await Connection.getConnection();
    const result = await db.runAsync(
      "INSERT INTO session (id, user_id) VALUES (?,?)",
      1,
      userId
    );
    console.log(" >>>", result);
    return result[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export {
  getActivitiies,
  getAllTables,
  getUserById,
  createUser,
  getAllUsers,
  executeAnyQueryWithParams,
  checkSession,
  createSession,
  deleteAllSession,
};
