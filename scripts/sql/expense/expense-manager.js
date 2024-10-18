import {
  getContactDetailsById,
  isUserAlreadyExistsInDatabase,
} from "../../utils/helpers";
import Connection from "../login/AuthOperations";
import { createUser } from "../executer";

export const getUserIdsForExpenseSplits = async (contactIds) => {
  const db = await Connection.getConnection();

  const userIds = [];

  if (contactIds.length > 0) {
    for (const id of contactIds) {
      const { name, phone } = await getContactDetailsById(id);
      let user = await isUserAlreadyExistsInDatabase(db, phone);
      if (user) {
        // already exists in db

        console.log("User already exists: ", user.id);
      } else {
        // create account
        user = await createUser(name, phone, 0);
        console.log("User created! : ", user.id);
      }
      // now create splits
      userIds.push(user.id);
    }
    console.log("Shared with ", userIds);

    return userIds;
  }
};

export const getExpenseSplits = async (expenseId) => {
  const QUERY = `SELECT * from expense_splits es JOIN users u on u.id = es.user_id  WHERE expense_id = ? `;
  const db = await Connection.getConnection();

  const result = await db.getAllAsync(QUERY, expenseId);

  return result;
};
