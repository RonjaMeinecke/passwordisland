import chalk from "chalk";

export const printWelcomeMessage = () => {
  console.log(`Welcome to ${chalk.underline.blue("passwordisland")}`);
};

export const printNoAccess = () => {
  console.warn(
    chalk.bgRed("...sorry this is not correct, please try again! ✌️")
  );
};

export const printPasswordSet = (passwordName: string) => {
  console.log(`You set a new ${passwordName} password.`);
};

export const printPassword = (passwordName: string, passwordValue: string) => {
  console.log(`Your ${passwordName} password is ${passwordValue}!`);
};
