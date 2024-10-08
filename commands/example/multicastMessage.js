// Use the reply API to send the welcome message
module.exports = {
  command: "multicast",
  aliases: [""],
  category: "example",
  description: "Multicast message example",
  handler: (client, event) => {
    // Sending a message to yourself using Multicast
    
    client.multicast([event.source.userId], {
        type: "text",
        text: "Hello, world!",
});
  },
};
