const { QuickDB } = require("quick.db");
const { Aki } = require("aki-api"); // Import aki-api
const db = new QuickDB();

module.exports = {
  command: "akinator",
  aliases: [],
  category: "fun",
  description:
    "Play Akinator: The bot will try to guess the character you are thinking of.",
  handler: async (client, event, args) => {
    const userId = event.source.userId;
    const groupId = event.source.groupId || event.source.roomId; // Check if the user is in a group or room

    // Check if a game is already active in the group
    const isGameActiveInGroup = await db.get(`${groupId}_akinatorActive`);

    if (!isGameActiveInGroup) {
      // Start Akinator game
      const aki = new Aki({ region: "en", childMode: false });
      await aki.start();

      // Store game session in QuickDB for the group
      await db.set(`${groupId}_akinatorActive`, true);
      await db.set(`${groupId}_akinatorOwner`, userId); // Store the user who started the game
      await db.set(`${groupId}_akinatorSession`, aki); // Store the game session object for the group
      await db.set(`${groupId}_akinatorStep`, 0); // Track question steps for the group

      // Ask the first question
      client.replyMessage(event.replyToken, {
        type: "text",
        text: `Think of a character and answer my questions!\nQuestion 1: ${aki.question}\nAnswers:\n1. Yes\n2. No\n3. Don't know\n4. Probably\n5. Probably not\n\n...or type "/end" to end the game`,
      });
    } else {
      client.replyMessage(event.replyToken, {
        type: "text",
        text: "Akinator is already running in this group. Please wait until the current session ends or type /end to stop it.",
      });
    }
  },
};
