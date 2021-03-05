import { printWelcomeMessage, printNoAccess } from "./messages";
import { askForAction, askForCredentials } from "./questions";
import { handleGetPassword, handleSetPassword, hasAccess } from "./commands";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { closeDB, connectDB } from "./db";

dotenv.config();
type CommandToFunction = {
  set: (passwordName: string) => Promise<void>;
  get: (passwordName: string) => Promise<void>;
};
const commandToFunction: CommandToFunction = {
  set: handleSetPassword,
  get: handleGetPassword,
};

const run = async () => {
  const url = process.env.MONGODB_URL;

  printWelcomeMessage();

  try {
    await connectDB(url, "passwordisland-ronja");
    const credentials = await askForCredentials();
    if (!hasAccess(credentials.masterPassword)) {
      printNoAccess();
      run();
      return;
    }

    const action = await askForAction();
    switch (action.command) {
      case "set":
        await handleSetPassword(action.passwordName);
        break;
      case "get":
        await handleGetPassword(action.passwordName);
        break;
    }

    await closeDB();
  } catch (error) {
    console.error(error);
  }
};

run();

// await connectDB(url, "passwordisland-ronja");
// // await createPasswordDoc({
// //   name: "Ronja",
// //   value: "1234",
// // });
// // await getCollection("password");
// //console.log(await readPasswordDoc("Ronja"));
// //await updatePasswordDoc("Ronja", { name: "RonjaM", value: "4321" });
// // await getCollection("passwords");
// await updatePasswordValue("RonjaM", "5678");
// //await deletePasswordDoc("RonjaM");
