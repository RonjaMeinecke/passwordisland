import { printPassword, printPasswordSet } from "./messages";
import { askForPasswordValue } from "./questions";
import {
  createPasswordDoc,
  getCollection,
  PasswordDoc,
  readPasswordDoc,
  updatePasswordValue,
} from "./db";

export const hasAccess = (masterPassword: string): boolean =>
  masterPassword === "Ibiza";

export const handleSetPassword = async (
  passwordName: string
): Promise<void> => {
  const passwordValue = await askForPasswordValue();
  await createPasswordDoc({ name: passwordName, value: passwordValue });
  printPasswordSet(passwordName);
};

export const handleGetPassword = async (
  passwordName: string
): Promise<void> => {
  const passwordDoc = await readPasswordDoc(passwordName);
  if (!passwordDoc) {
    console.log("password not found");
    return;
  }
  printPassword(passwordDoc.name, passwordDoc.value);
};

// export const handleSetPassword = async (
//   passwordName: string
// ): Promise<void> => {
//   const passwordDoc = await readPasswordDoc(passwordName);
//   if (!passwordDoc) {
//     const passwordValue = await askForPasswordValue();
//     const newPasswordDoc = {
//       name: passwordName,
//       value: passwordValue,
//     };
//     await createPasswordDoc(newPasswordDoc);
//     printPasswordSet(passwordName);
//   } else if (passwordDoc && passwordName === passwordDoc.name) {
//     console.log(
//       `this password already exist, please choose a new one! ${passwordName}`
//     );
//     const newPasswordValue = await askForPasswordValue();
//     await updatePasswordValue(passwordName, newPasswordValue);
//     printPasswordSet(passwordDoc.name);
//   }
// };
