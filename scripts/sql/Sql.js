import * as SQLite from "expo-sqlite";

export default class SqliteDatabase {
  static #instance = null;
  connection = null;

  constructor() {
    if (SqliteDatabase.#instance) {
      return SqliteDatabase.#instance;
    }
    this.connection = null;
    SqliteDatabase.#instance = this;
  }

  async connect() {
    if (this.connection) {
      return this.connection;
    }
    try {
      const db = await SQLite.openDatabaseAsync("splitbill");
      console.log("DB connection established");
      return db;
    } catch (error) {
      throw error;
    }
  }
}
