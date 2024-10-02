import { useSQLiteContext } from "expo-sqlite";
const createSession = async (userId) => {
  const db = useSQLiteContext();
  try {
    const result = db.runAsync(
      "INSERT INTO session (user_id) VALUES (?)",
      userId
    );
    console.log(">>>>>>>>>>>", result);

    return result.insertedRowId;
  } catch (error) {
    console.log("Error occurred while creating session: ", error);
    throw error;
  }
};
const checkSession = async () => {
  try {
    const db = await Connection.getConnection();
    const result = db.getAllAsync("SELECT user_id from session", userId);

    return result;
  } catch (error) {
    console.log("Error occurred while checkSession : ", error);
    throw error;
  }
};
export { checkSession, createSession };
