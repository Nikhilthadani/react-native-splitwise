export const UsersTable = `CREATE TABLE IF NOT EXISTS users   (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NULL,
  phone TEXT NOT NULL UNIQUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  is_registered INTEGER DEFAULT 0
);`;

export const GroupsTable = `CREATE TABLE IF NOT EXISTS groups   (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  group_name TEXT NOT NULL,
  created_by INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id)
);`;

export const GroupMembersTable = `CREATE TABLE IF NOT EXISTS group_members  (
  group_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (group_id, user_id),
  FOREIGN KEY (group_id) REFERENCES groups(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);`;

export const ExpensesTable = `CREATE TABLE IF NOT EXISTS expenses  (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  description TEXT NOT NULL,
  amount REAL NOT NULL,
  paid__by INTEGER NOT NULL,
  group_id INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (paid_by) REFERENCES users(id),
  FOREIGN KEY (group_id) REFERENCES groups(id)
);`;

export const ExpenseSplitsTable = `CREATE TABLE IF NOT EXISTS expense_splits  (
  expense_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  amount_owed REAL NOT NULL,
  PRIMARY KEY (expense_id, user_id),
  FOREIGN KEY (expense_id) REFERENCES expenses(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);`;

export const PaymentsTable = `CREATE TABLE IF NOT EXISTS payments  (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  payer_id INTEGER NOT NULL,
  payee_id INTEGER NOT NULL,
  amount REAL NOT NULL,
  expense_id INTEGER NOT NULL,
  status TEXT,
  payment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (payer_id) REFERENCES users(id),
  FOREIGN KEY (payee_id) REFERENCES users(id)
);`;
export const SessionTable = `CREATE TABLE IF NOT EXISTS session  (
  id INTEGER,
  user_id INT,
  PRIMARY KEY (id, user_id)
  FOREIGN KEY (user_id) REFERENCES users(id)
);`;
export const FriendsTable = `CREATE TABLE IF NOT EXISTS friends  (
  adder_id INTEGER NOT NULL,
  added_id INTEGER NOT NULL,
  PRIMARY KEY (adder_id, added_id),
  FOREIGN KEY (adder_id) REFERENCES users(id),
  FOREIGN KEY (added_id) REFERENCES users(id)
);`;
export const ActivityTable = `CREATE TABLE IF NOT EXISTS activity  (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  activity TEXT NOT NULL,
  user_id INTEGER NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);`;
