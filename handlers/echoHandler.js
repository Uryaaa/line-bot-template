const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = async (client, event) => {
  const userId = event.source.userId;
  const userMessage = event.message.text;

  // Check if the user is in echo mode
  const echoOwner = await db.get(`echoMode_owner`);

  // Only respond if the current user is the one who started echo mode
  if (echoOwner === userId) {
    // If the user types /end, exit echo mode
    if (userMessage === "/end") {
      await db.delete(`echoMode_owner`); // Remove the owner of echo mode
      return client.replyMessage({
        replyToken: event.replyToken,
        messages: [
          {
            type: "text",
            text: "Echo mode deactivated.",
          },
        ],
      });
    }

    // Echo the user's message
    return client.replyMessage({
      replyToken: event.replyToken,
      messages: [
        {
          type: "text",
          text: userMessage,
        },
      ],
    });
  }

  // Ignore messages from users who didn't start echo mode
  return false;
};
