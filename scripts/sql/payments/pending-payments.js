import Connection from "../login/AuthOperations";

export const getPendingPaymentsOfUser = async (userId) => {
  try {
    const db = await Connection.getConnection();
    // get pending payments of user
    const QUERY = `SELECT * from payments p
    JOIN expenses e ON e.id =  p.expense_id JOIN expense_splits es ON es.expense_id = p.expense_id
    WHERE p.payer_id = ? OR p.payee_id=?  AND p.status = 'pending'`;

    const result = await db.getAllAsync(QUERY, [userId, userId]);
    return result;
  } catch (error) {
    console.log("Error in getPendingPaymentsOfUser: ", error);
    throw error;
  }
};
