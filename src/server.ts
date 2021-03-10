import http from "http";
import dotenv from "dotenv";
import { connectDB, readPasswordDoc } from "./db";

dotenv.config();

const parseJSONBody = <T>(request: http.IncomingMessage): Promise<T> => {
  return new Promise((resolve) => {
    let data = "";
    request.on("data", (chunk) => {
      data += chunk;
    });
    request.on("end", () => {
      resolve(JSON.parse(data));
    });
  });
};

const port = process.env.PORT;
console.log("Port is: ", port);

const url = process.env.MONGODB_URL;

connectDB(url, "passwordisland-ronja");

const server = http.createServer(async (request, response) => {
  //-- start HTML later --
  // if (request.url === "/") {
  //   response.statusCode = 200;
  //   response.setHeader("Content-Type", "text/html");
  //   response.end("<h1>P A S S W O R D I S L A N D</h1>");
  //   return;
  // }

  const parts = request.url.split("/");
  const passwordName = parts[parts.length - 1];

  if (request.method === "GET") {
    const passwordDoc = await readPasswordDoc(passwordName);
    if (!passwordDoc) {
      response.statusCode = 404;
      response.end();
      return;
    }

    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify(passwordDoc));

    return;
  } else if (request.method === "POST")
    if (request.method === "POST") {
      const newPassword = await parseJSONBody(request);
      console.log({ newPassword });
      response.end();
    }

  response.end();
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
