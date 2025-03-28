const fs = require("fs");

module.exports.loadPostbacks = (client) => {
  // Initialize client.postbacks as Map
  client.postbacks = new Map();

  // Read the postbacks folder
  fs.readdirSync("./postbacks")
    .filter((file) => file.endsWith(".js")) // Only take .js files
    .forEach((file) => {
      // Load each postback handler
      const postback = require(`../postbacks/${file}`);
      console.log(`Loading postback ${file}`);

      if (postback.postbackData.endsWith("PostbackData=")) {
        // Handle both type postbacks
        client.postbacks.set(postback.postbackData, postback);
      } else {
        client.postbacks.set(postback.postbackData, postback);
      }
    });
};