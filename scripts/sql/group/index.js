import * as SQLite from "expo-sqlite";

export const groupCreateQuery = `INSERT INTO groups ( group_name, created_by ) VALUES(?,?)`;
export const groupMemberCreateQuery = `INSERT INTO groups ( group_name, created_by ) VALUES(?,?)`;

export const createNewGroup = async (name, userId) => {
  let db;
  try {
    db = await SQLite.openDatabaseAsync("test.db");
    const result = await db.runAsync(groupCreateQuery, name, userId);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await db.closeAsync();
  }
};
export const createGroupMember = async (name, userId) => {
  let db;
  try {
    db = await SQLite.openDatabaseAsync("test.db");
    const result = await db.runAsync(groupCreateQuery, name, userId);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await db.closeAsync();
  }
};
