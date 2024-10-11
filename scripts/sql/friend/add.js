import * as Contacts from "expo-contacts";
import { createUser } from "../executer";
import Connection from "../login/AuthOperations";

const addNewFriend = async (db, name, phone, currentUserId) => {
  if (!db || !name || !phone) return;
  try {
    console.log("Checking if user already exists ");
    // Create record in users table of friend, if already exists add only in friend

    let user = await isUserAlreadyExists(db, phone);
    if (!user) {
      user = await createUser(name, phone, 0);
      console.log("USER TO BE CREATED");
    }
    user = user[0];
    console.log("OTHER___USER>>>>>", user);

    console.log("OTHER USER ID", user.id);

    console.log("CURRENT USER ID", currentUserId);

    // create record in friend table

    const addFriendQuey = `INSERT INTO friends (adder_id, added_id) VALUES(?,?)`;
    const friend = await db.runAsync(addFriendQuey, [currentUserId, user.id]);

    console.log("Friend created: ", friend.lastInsertedRowId);

    // create activity
    const activityText = `Added friend ${name} at ${new Date().toLocaleDateString()}`;
    const activityTextSecondUser = `${name}Added you as friend at ${new Date().toLocaleDateString()}`;
    const activityQuery = "INSERT INTO activity (activity,user_id) VALUES(?,?)";

    const activity1 = await db.runAsync(activityQuery, [
      activityText,
      currentUserId,
    ]);
    const activity2 = await db.runAsync(activityQuery, [
      activityTextSecondUser,
      user.id,
    ]);

    console.log(
      "Activities created: ",
      activity1.lastInsertedRowId,
      activity2.lastInsertedRowId
    );
  } catch (error) {
    console.log("ERROR WHILE PERFORMING: addNewFriend");
    console.log(error);
    throw error;
  }
};

export const isUserAlreadyExists = async (db, phoneNumber) => {
  try {
    const query = `SELECT name, phone, id from users where phone = ?`;
    const user = await db.getAllAsync(query, [phoneNumber]);
    console.log(user);
    return user;
  } catch (error) {
    console.log("Error when checking isUserAlreadyExists => ", error);
    throw error;
  }
};
const getContactById = async (id) => {
  alert(id);
  try {
    const contact = await Contacts.getContactByIdAsync(id, [
      "phoneNumbers",
      "name",
    ]);
    if (!contact && !contact.name) return null;
    return { name: contact.name, phone: contact.phoneNumbers[0].number };
  } catch (error) {
    console.log("ERROR FINDING CONTACT");
    console.log(error);
  }
};

export const getUpdatedPhoneNummber = (number) => {
  let num = "";
  for (const n of number) {
    if (n === "(" || n === ")" || n === " " || n === "-") {
      continue;
    }
    num = num + n;
  }
  return num;
};

export const getPhoneNumberOfContact = async (id) => {
  const contact = await getContactById(id);
  if (!contact) return;
  const phoneUpdated = getUpdatedPhoneNummber(contact.phone.replace("+91", ""));
  return phoneUpdated;
};

export const addFriend = async (id, currentUserId) => {
  let db;
  try {
    const contact = await getContactById(id);
    if (!contact) return;
    const phoneUpdated = getUpdatedPhoneNummber(
      contact.phone.replace("+91", "")
    );

    alert(`PHONE: ${phoneUpdated}`);

    db = await Connection.getConnection();
    db.execAsync("BEGIN");
    //////////////////////////////
    console.log("TXN Started");

    //
    console.log("DETAILS", contact.name, phoneUpdated, currentUserId);
    await addNewFriend(db, contact.name, phoneUpdated, currentUserId);

    //

    console.log("TXN Ended");

    //////////////////////////////
    await db.execAsync("COMMIT");
    console.log("Transaction completed and committed successfully");
  } catch (error) {
    await db.execAsync("ROLLBACK");
    console.error("Transaction failed and was rolled back:", error);
  }
};
