import * as SQLite from "expo-sqlite";
import {
  UsersTable,
  ExpenseSplitsTable,
  ExpensesTable,
  GroupMembersTable,
  GroupsTable,
  PaymentsTable,
  SessionTable,
} from "./tables";

export const executeSqlCreateTables = async () => {
  let db;
  try {
    db = await SQLite.openDatabaseAsync("test.db");
    await db.execAsync(UsersTable);
    await db.execAsync(GroupsTable);
    await db.execAsync(GroupMembersTable);
    await db.execAsync(ExpensesTable);
    await db.execAsync(ExpenseSplitsTable);
    await db.execAsync(PaymentsTable);
    await db.execAsync(SessionTable);

    console.log("Created all tables 🎉");
  } catch (error) {
    console.log("Error connecting to SQite");
    throw error;
  } finally {
    await db.closeAsync();
  }
};
async function getAllTables() {
  let db;
  try {
    db = await SQLite.openDatabaseAsync("test.db");
    const result = await db.getAllAsync(
      "SELECT name FROM sqlite_master WHERE type = 'table';"
    );
    console.log(JSON.stringify(result));
  } catch (error) {
    throw err;
  } finally {
    await db.closeAsync();
  }
}
async function getUserById(id) {
  let db;
  try {
    db = await SQLite.openDatabaseAsync("test.db");
    const result = await db.getAllAsync(
      "SELECT name,email,id from users where id = ?;",
      [id]
    );
    console.log("RESULT", result);

    return result[0];
  } catch (error) {
    throw error;
  } finally {
    await db.closeAsync();
  }
}
async function getAllUsers() {
  let db;
  try {
    db = await SQLite.openDatabaseAsync("test.db");
    const result = await db.getAllAsync("SELECT * FROM users");
    for (const row of result) {
      console.log(row.id, row.value, row.intValue);
    }
    console.log(result);
    return result[0];
  } catch (error) {
    console.log(error);

    throw error;
  } finally {
    await db.closeAsync();
  }
}
async function createUser(name, email) {
  let db;
  try {
    console.log(name, email);

    db = await SQLite.openDatabaseAsync("test.db");
    const result = await db.runAsync(
      "INSERT INTO users ( name , email) VALUES (?,?)",
      name,
      email
    );
    console.log(result.lastInsertRowId);

    return await getUserById(result.lastInsertRowId);
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await db.closeAsync();
  }
}

const executeAnyQueryWithParams = async (query, ...params) => {
  let db;
  try {
    console.log("Executing: ", query, "with params: ", params);

    db = await SQLite.openDatabaseAsync("test.db");
    const result = await db.runAsync(query, ...params);
    console.log(result.lastInsertRowId);

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await db.closeAsync();
  }
};

async function checkSession() {
  let db;
  try {
    db = await SQLite.openDatabaseAsync("test.db");
    const result = await db.getAllAsync("SELECT * FROM session");
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await db.closeAsync();
  }
}
async function deleteAllSession() {
  let db;
  try {
    db = await SQLite.openDatabaseAsync("test.db");
    const result = await db.getAllAsync("SELECT * FROM session");
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await db.closeAsync();
  }
}
async function createSession(userId) {
  let db;
  try {
    db = await SQLite.openDatabaseAsync("test.db");
    const result = await db.runAsync(
      "INSERT INTO session (id, user_id) VALUES (?,?)",
      1,
      userId
    );
    console.log("createsession >>>", result);
    return result[0];
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await db.closeAsync();
  }
}

export {
  getAllTables,
  getUserById,
  createUser,
  getAllUsers,
  executeAnyQueryWithParams,
  checkSession,
  createSession,
  deleteAllSession,
};
