module.exports = {
  command: "broardcast",
  aliases: [""],
  category: "example",
  description: "broardcast message example",
  handler: (client, blobClient, event) => {
    // Send a broardcast message to all followers
    client.broadcast({
        messages : [
        {
        type: "text",
        text: "This is broardcast message example"
        }
      ]
    });

  },
};
