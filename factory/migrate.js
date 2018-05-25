import axios from "axios";
import dotenv from "dotenv";
import users from "./users";

const configuration = dotenv.config().parsed;

if (!configuration.CRESCENDO_AUTH_TOKEN) {
  throw new Error("Environment variables not found!");
}

const requestURL = "https://crescendo-app.herokuapp.com/users";

const startMigrating = async () => {
  const promises = users.map(u =>
    axios({
      method: "POST",
      url: requestURL,
      data: u,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: configuration.CRESCENDO_AUTH_TOKEN
      }
    })
  );

  try {
    await Promise.all(promises);
  } catch (err) {
    throw new Error(err);
  }
};

startMigrating().then(() => {
  console.log(`SUCCESS: ${users.length} users migrated!`);
});
