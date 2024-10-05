import * as Sqlite from "expo-sqlite";

export default class Connection {
  static #connection = null;
  static async getConnection() {
    if (!this.#connection) {
      this.#connection = await Sqlite.openDatabaseAsync("test.db");
      return this.#connection;
    }
    return this.#connection;
  }
}
