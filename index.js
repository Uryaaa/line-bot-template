/*
This is a LINE bot intended for template starter for someone who want to build their own bot
all @line/bot-sdk documentation can be found at https://developers.line.biz/en/docs/
*/
require("dotenv").config();
const line = require("@line/bot-sdk");
const express = require("express");
const { loadEvents } = require("./loaders/eventLoader");
const { loadCommands } = require("./loaders/commandLoader");
const { loadPostbacks } = require("./loaders/postbackLoader");
const path = require("path");
const { setupRichMenu } = require("./richMenu")
// LINE SDK configuration
const config = {
  channelSecret: process.env.channelSecret,
};

// Create LINE SDK client
const client = new line.Client({
  channelAccessToken: process.env.channelAccessToken,
});

// Express app setup
const app = express();

// Load commands, events, and postbacks
loadCommands(client);
loadPostbacks(client);
loadEvents(client, app, config);
// Setup Rich Menu
// (async () => {
//   try {
//     await setupRichMenu(client); 
//     console.log("Rich menu setup completed!");
//   } catch (err) {
//     console.error("Failed to setup rich menu:", err);
//   }
// })();
// Load static files
app.use("/", express.static(path.join(__dirname, "static")));

// Listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  return
});