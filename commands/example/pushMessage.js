module.exports = {
  command: "push",
  aliases: ["dm"],
  category: "example",
  description: "Push message example",
  handler: (client, blobClient, event) => {
    
   if (event.source.type ==="group") {
    client.pushMessage({
      to: event.source.groupId,
      messages: [
        {
          type: "text",
          text: "Hello, world!",
        },
      ],
    })
   } else {
    client.pushMessage({
      to: event.source.userId,
      messages: [
        {
          type: "text",
          text: "Hello, world!",
        },
      ],
    })
   }
    
  },
};
