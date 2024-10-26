const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
  command: "content",
  aliases: [],
  category: "utility",
  description: "Request the user to upload an image",
  handler: async (client, blobClient, event, args) => {
    const userId = event.source.userId;

    // Store state in the database that the user is expected to upload an image
    await db.set(`awaitingImage_${userId}`, true);

    // Bot prompts the user to upload an image
    await client.replyMessage({
      replyToken: event.replyToken,
      messages: [
        {
          type: "text",
          text: "Please upload an image for me to process.",
        },
      ],
    });
  },
};
