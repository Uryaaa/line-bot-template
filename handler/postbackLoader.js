const fs = require("fs");
const Enmap = require("enmap");

module.exports.loadPostbacks = (client) => {
  // Initialize client.postbacks as Enmap
  client.postbacks = new Enmap();

  // Read the postbacks folder
  fs.readdirSync("./postbacks")
    .filter((file) => file.endsWith(".js")) // Only take .js files
    .forEach((file) => {
      // Load each postback handler
      const postback = require(`../postbacks/${file}`);
      console.log(`Loading postback ${file}`);

if (postback.postbackData.endsWith("_")) {
  client.postbacks.set(postback.postbackData, postback);
} else {
  client.postbacks.set(postback.postbackData, postback);
}
    });
};
