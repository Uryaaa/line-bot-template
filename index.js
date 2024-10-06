const fs = require("fs");
require("dotenv").config();
const line = require("@line/bot-sdk");
const express = require("express");
const { loadEvents } = require("./handler/eventLoader");
const { loadCommands } = require("./handler/commandLoader"); // Import command loader
const { loadPostbacks } = require("./handler/postbackLoader");
const path = require("path");
// Buat konfigurasi SDK LINE dari local variable
const config = {
  channelSecret: process.env.channelSecret,
};

// Buat LINE SDK client
const client = new line.Client({
  channelAccessToken: process.env.channelAccessToken,
});
// Buat Express app
const app = express();

// Load commands dari commandLoader.js
loadCommands(client); // Panggil fungsi loadCommands
// Misalnya di dalam initialization atau setup
loadPostbacks(client);
// Load dan tangani event secara dinamis
loadEvents(client, app, config);
client.getGroupSummary
app.use("/", express.static(path.join(__dirname, "static")));
// Dengarkan di port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
