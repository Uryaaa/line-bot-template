/*
This is a LINE bot intended for template starter for someone who want to build their own bot
all @line/bot-sdk documentation can be found at https://developers.line.biz/en/docs/
*/


require("dotenv").config();
const line = require("@line/bot-sdk");
const express = require("express");
const { loadEvents } = require("./handler/eventLoader");
const { loadCommands } = require("./handler/commandLoader");
const { loadPostbacks } = require("./handler/postbackLoader");
const path = require("path");

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

// Load static files
app.use("/", express.static(path.join(__dirname, "static")));

// Listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
