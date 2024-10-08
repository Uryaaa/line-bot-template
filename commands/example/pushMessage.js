module.exports = {
  command: "push",
  aliases: ["dm"],
  category: "example",
  description: "Push message example",
  handler: (client, event) => {
// Sending a message to yourself using pushMessage
   client.pushMessage(event.source.userId, {
    type: "text",
    text: "Hello, world!",
  })
    
  },
};
