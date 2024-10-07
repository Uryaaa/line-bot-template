const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
  command: "echo",
  aliases: [],
  category: "fun",
  description: "Echo mode: Bot will repeat user input until /end is typed.",
  handler: async (client, event, args) => {
    const userId = event.source.userId;

    // Check if echo mode is already active
    const echoOwner = await db.get(`echoMode_owner`);
    if (echoOwner) {
      return client.replyMessage(event.replyToken, {
        type: "text",
        text: "Mode echo sudah aktif oleh pengguna lain.",
      });
    }

    // Activate echo mode and set the user as the owner
    await db.set(`echoMode_owner`, userId);
    client.replyMessage(event.replyToken, {
      type: "text",
      text: "Masuk ke mode echo!",
    });
  },
};
