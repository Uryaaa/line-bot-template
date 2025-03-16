const fs = require("fs");

module.exports.loadCommands = (client) => {
  // Initialize client.commands as Map
  client.commands = new Map();

  // Read commands folder and subfolders
  fs.readdirSync("./commands").forEach((dirs) => {
    const commands = fs
      .readdirSync(`./commands/${dirs}`)
      .filter((files) => files.endsWith(".js"));

    for (const file of commands) {
      const command = require(`../commands/${dirs}/${file}`);
      console.log(`Loading command ${file}`);
      client.commands.set(command.command.toLowerCase(), command);
    }
  });
};