import Connection from "../login/AuthOperations";

export const getFriendsSettlementHistory = async (
  currentUserId,
  otherUserId
) => {
  try {
    const QUERY = `SELECT 
  *
FROM 
    expense_splits es
LEFT JOIN 
    payments p ON es.expense_id = p.expense_id 
               AND es.user_id = p.payer_id

               LEFT JOIN expenses e on e.id=es.expense_id
WHERE 
    (p.payer_id = ? AND p.payee_id = ?) OR (p.payer_id = ? AND p.payee_id = ?)
GROUP BY 
    es.expense_id, es.user_id
`;

    const connection = await Connection.getConnection();

    const res = await connection.getAllAsync(QUERY, [
      currentUserId,
      otherUserId,
      otherUserId,
      currentUserId,
    ]);
    console.log(res);

    return res;
  } catch (error) {
    console.log("Error in getFriendsSettlementHistory", error);
    throw error;
  }
};
export const getExpenseById = async (id) => {
  const conn = await Connection.getConnection();
};
