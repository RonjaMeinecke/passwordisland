// import { printWelcomeMessage, printNoAccess } from "./messages";
// import { askForAction, askForCredentials } from "./questions";
// import { handleGetPassword, handleSetPassword, hasAccess } from "./commands";
// import { serialize } from "v8";

import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { closeDB, connectDB, getCollection } from "./db";
dotenv.config();

const run = async () => {
  const url = process.env.MONGODB_URL;
  try {
    await connectDB(url, "passwordisland-ronja");
    await getCollection("password");
    await closeDB();

    // await db.collection("inventory").insertOne({
    //   item: "canvas",
    //   qty: 100,
    //   tags: ["cotton"],
    //   size: { h: 28, w: 35.5, uom: "cm" },
    // });
  } catch (error) {
    console.error(error);
  }
  //   printWelcomeMessage();
  //   const credentials = await askForCredentials();
  //   if (!hasAccess(credentials.masterPassword)) {
  //     printNoAccess();
  //     run();
  //     return;
  //   }
  //   const action = await askForAction();
  //   switch (action.command) {
  //     case "set":
  //       handleSetPassword(action.passwordName);
  //       break;
  //     case "get":
  //       handleGetPassword(action.passwordName);
  //       break;
  //   }
};

run();
