import prompts from "prompts";
import chalk from "chalk";

// console.log(chalk.blue("Hello World!"));

const run = async () => {
  console.log("Welcome to passwordisland");

  const prompts = require("prompts");

  const questions = [
    {
      type: "password",
      name: "username",
      message: "enter your username",
      validate: (username) =>
        username === "islander" ? true : "you may not enter!",
    },
    {
      type: "password",
      name: "value",
      message: "Welcome on the island! Where do you want to go?",
      validate: (value) =>
        value === "for a swim" ? true : "you must leave the island!",
    },
  ];

  async () => {
    const response = await prompts(questions);
  };
};

run();
