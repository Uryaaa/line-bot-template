// Use the reply API to send the welcome message
module.exports = {
  command: "multicast",
  aliases: [""],
  category: "example",
  description: "Multicast message example",
  handler: (client, blobClient, event) => {
    // Sending a message to yourself using Multicast
    
    client.multicast({
      to : [event.source.userId], // Array of user IDs
      messages : [
        {
          type: "text",
          text: "Hello, this is a multicast message"
        }
      ]
    });
  },
};
