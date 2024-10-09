const fs = require("fs");
const Enmap = require("enmap");

module.exports.loadCommands = (client) => {
  // Inisialisasi client.commands sebagai Enmap
  client.commands = new Enmap();

  // Baca folder commands dan subfoldernya
  fs.readdirSync("./commands").forEach((dirs) => {
    const commands = fs
      .readdirSync(`./commands/${dirs}`)
      .filter((files) => files.endsWith(".js"));

    for (const file of commands) {
      const command = require(`../commands/${dirs}/${file}`);
      console.log(`Loading command ${file}`);
      client.commands.set(command.command, command);
    }
  });
};
