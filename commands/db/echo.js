const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
  command: "echo",
  aliases: [],
  category: "fun",
  description: "Echo mode: Bot will repeat user input until /end is typed.",
  handler: async (client, blobClient, event, args) => {
    const userId = event.source.userId;

    // Check if echo mode is already active
    const echoOwner = await db.get(`echoMode_owner`);
    if (echoOwner) {
      return client.replyMessage({
        replyToken: event.replyToken,
        messages: [
          {
            type: "text",
            text: "Echo mode is already active. Type /end to exit.",
          },
        ],
      });
    }

    // Activate echo mode and set the user as the owner
    await db.set(`echoMode_owner`, userId);
    client.replyMessage({
      replyToken: event.replyToken,
      messages: [
        {
          type: "text",
          text: "Echo mode activated. Type /end to exit.",
        },
      ],
    });
  },
};
