// import { printWelcomeMessage, printNoAccess } from "./messages";
// import { askForAction, askForCredentials } from "./questions";
// import { handleGetPassword, handleSetPassword, hasAccess } from "./commands";
// import { serialize } from "v8";

import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const run = async () => {
  const url = process.env.MONGODB_URL;
  try {
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });
    console.log("Connect to DB!");

    const db = client.db("passwordisland-ronja");

    await db.collection("inventory").insertOne({
      item: "canvas",
      qty: 100,
      tags: ["cotton"],
      size: { h: 28, w: 35.5, uom: "cm" },
    });

    client.close();
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
