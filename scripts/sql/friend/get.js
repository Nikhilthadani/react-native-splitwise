import Connection from "../login/AuthOperations";

export const getFriendsOfUser = async (userId) => {
  try {
    const connection = await Connection.getConnection();
    const QUERY = ` SELECT u.* FROM friends f
        INNER JOIN users u
        ON (u.id = f.added_id OR u.id = f.adder_id)
        WHERE (f.adder_id = ? OR f.added_id = ?)
         AND u.id != ? `;
    const result = await connection.getAllAsync(QUERY, [
      userId,
      userId,
      userId,
    ]);
    return result;
  } catch (error) {
    console.log("Erroor while gettiiing friends of user");
    throw error;
  }
};
