module.exports = {
  command: "broardcast",
  aliases: [""],
  category: "example",
  description: "broardcast message example",
  handler: (client, event) => {
    // Send a broardcast message to all followers
    client.broadcast({
        type: "text",
        text: "This is broardcast message example"
    });

  },
};
