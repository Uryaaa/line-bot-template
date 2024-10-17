module.exports = {
  command: "push",
  aliases: ["dm"],
  category: "example",
  description: "Push message example",
  handler: (client, event) => {
    
   if (event.source.type ==="group") {
    client.pushMessage(event.source.groupId, {
      type: "text",
      text: "Hello, world!",
    })
   } else {
    client.pushMessage(event.source.userId, {
      type: "text",
      text: "Hello, world!",
    })
   }
    
  },
};
