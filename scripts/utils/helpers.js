import * as Contacts from "expo-contacts";

export const getFormattedPhoneNumber = (number) => {
  number = number.replace("+91", "");
  let num = "";
  for (const n of number) {
    if (n === "(" || n === ")" || n === " " || n === "-") {
      continue;
    }
    num = num + n;
  }
  return num;
};
export const getContactDetailsById = async (id) => {
  alert(id);
  try {
    const contact = await Contacts.getContactByIdAsync(id, [
      "phoneNumbers",
      "name",
    ]);
    if (!contact && !contact.name) return null;
    return {
      name: contact.name,
      phone: getFormattedPhoneNumber(contact.phoneNumbers[0].number),
    };
  } catch (error) {
    console.log("ERROR FINDING CONTACT");
    console.log(error);
  }
};
export const isUserAlreadyExistsInDatabase = async (db, phoneNumber) => {
  try {
    const query = `SELECT name, phone, id from users where phone = ?`;
    const user = await db.getFirstAsync(query, [phoneNumber]);
    console.log(user);
    return user;
  } catch (error) {
    console.log("Error when checking isUserAlreadyExists - helpers => ", error);
    throw error;
  }
};
export const splitAmountEqually = (amount, noOfPeople) => {
  return amount / noOfPeople;
};
export const getDetails = () => {};
