import Connection from "../login/AuthOperations";
import { getUserIdsForExpenseSplits } from "./expense-manager";
const PaymentStates = {
  pending: "pending",
  complete: "complete",
};
const addNewExpense = async (db, description, amount, paidBy, groupId) => {
  try {
    const QUERY = `INSERT INTO expenses 
    (description, amount, paid_by, group_id)
    VALUES(?,?,?,?)`;
    const newExpense = await db.runAsync(QUERY, [
      description,
      amount,
      paidBy,
      groupId ?? null,
    ]);
    console.log(JSON.stringify(newExpense));
    return newExpense?.lastInsertRowId;
  } catch (error) {
    console.log("Error in addNewExpense", error);
    throw error;
  }
};

const addNewExpenseSplit = async (db, expenseId, userId, amountOwed) => {
  try {
    const QUERY = `INSERT INTO expense_splits 
      (expense_id, user_id, amount_owed) VALUES (?,?,?)`;
    const newExpenseSplit = await db.runAsync(
      QUERY,
      expenseId,
      userId,
      amountOwed
    );
    return newExpenseSplit.lastInsertRowId;
  } catch (error) {
    console.log("Error in addNewExpenseSplit", error);
    throw error;
  }
};

const newPayment = async (db, payerId, payeeId, amount, expenseId) => {
  try {
    const QUERY = `INSERT INTO payments (payer_id, payee_id, amount, expense_id, status)
        VALUES (?,?,?,?,?)`;

    const payment = await db.runAsync(QUERY, [
      payerId,
      payeeId,
      amount,
      expenseId,
      PaymentStates.pending,
    ]);

    return payment.lastInsertRowId;
  } catch (error) {
    console.log("Error in newPayment", error);
    throw error;
  }
};
export const addExpense = async (
  contacts,
  sharePerUser,
  description,
  amount,
  paidBy,
  groupId
) => {
  let db;
  try {
    console.log("Perform Transaction withdetails:", {
      sharePerUser,
      description,
      amount,
      paidBy,
      groupId,
    });
    db = await Connection.getConnection();

    // START TXN
    db.execAsync("BEGIN");
    console.log("STARTED TXN");

    // create expense
    const expenseId = await addNewExpense(
      db,
      description,
      amount,
      paidBy,
      groupId
    );

    console.log("Expense id created:", expenseId);

    // create splits
    const userIds = await getUserIdsForExpenseSplits(contacts);
    const splittedIds = [];
    const payments = [];

    for (const userId of userIds) {
      const newSplit = await addNewExpenseSplit(
        db,
        expenseId,
        userId,
        sharePerUser
      );
      console.log("Splitted Id:", newSplit);
      splittedIds.push(newSplit);

      const pendingPayment = await newPayment(
        db,
        userId,
        paidBy,
        sharePerUser,
        expenseId
      );
      console.log("Pending payment created: ", pendingPayment);
      payments.push(pendingPayment);

      // new payment for each one of them and mark status as PENDING
    }
    console.log("Operations completed");
    console.log("Results: ");
    console.log({
      userIds: JSON.stringify(userIds),
      expenseId,
      payments: JSON.stringify(payments),
      splittedIds: JSON.stringify(splittedIds),
    });
    // create payment for them

    // loop and add values
    await db.execAsync("COMMIT");
    console.log("COMMITED TXN");
  } catch (error) {
    console.log("error while performing transaction: ", error);
    // Rollback the transaction on failure
    await db.execAsync("ROLLBACK");
    console.log("Transaction Rolled Back");
    throw error;
  }
};
