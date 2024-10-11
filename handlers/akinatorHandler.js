const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { Aki } = require("aki-api");

module.exports = async (client, event) => {
  const userId = event.source.userId;
  const groupId = event.source.groupId || event.source.roomId; // Check if the user is in a group or room
  const userMessage = event.message.text.toLowerCase();

  // Check if there is an active Akinator session in the group
  const isAkinatorActive = await db.get(`${groupId}_akinatorActive`);
  const akinatorOwner = await db.get(`${groupId}_akinatorOwner`); // Get the owner of the game

  // Only allow the user who started the game to continue
  if (isAkinatorActive && akinatorOwner === userId) {
    // If the user types /end, stop the game
    if (userMessage === "/end") {
      await db.delete(`${groupId}_akinatorActive`);
      await db.delete(`${groupId}_akinatorOwner`);
      await db.delete(`${groupId}_akinatorSession`);
      await db.delete(`${groupId}_akinatorStep`);
      return client.replyMessage(event.replyToken, {
        type: "text",
        text: "Akinator game ended in this group. Thanks for playing!",
      });
    }

    // Retrieve the Akinator session from QuickDB for the group
    const aki = await db.get(`${groupId}_akinatorSession`);
    const akiSession = Object.assign(new Aki({ region: "en" }), aki); // Recreate Akinator session

    // Determine the user's answer (numbers or text)
    let answerIndex;
    if (["1", "yes"].includes(userMessage)) answerIndex = 0;
    else if (["2", "no"].includes(userMessage)) answerIndex = 1;
    else if (["3", "don't know", "dont know"].includes(userMessage))
      answerIndex = 2;
    else if (["4", "probably"].includes(userMessage)) answerIndex = 3;
    else if (["5", "probably not"].includes(userMessage)) answerIndex = 4;
    else {
      return client.replyMessage(event.replyToken, {
        type: "text",
        text: "Please respond with 1 (Yes), 2 (No), 3 (Don't know), 4 (Probably), or 5 (Probably not).",
      });
    }

    // Progress the game with the given answer
    await akiSession.step(answerIndex);

    // Check if Akinator has enough progress to make a guess
    if (akiSession.guess?.id_base_proposition) {
      const guess = akiSession.guess;

      // End the game and show the result
      await db.delete(`${groupId}_akinatorActive`);
      await db.delete(`${groupId}_akinatorOwner`);
      await db.delete(`${groupId}_akinatorSession`);
      await db.delete(`${groupId}_akinatorStep`);

      return client.replyMessage(event.replyToken, [
        {
          type: "text",
          text: `I think your character is: ${guess.name_proposition}\nDescription: ${guess.description_proposition}`,
        },
        {
          type: "image",
          originalContentUrl: guess.photo,
          previewImageUrl: guess.photo,
        },
      ]);
    } else {
      // Continue asking questions
  
      await db.set(`${groupId}_akinatorSession`, akiSession); // Update session for the group
      await db.set(`${groupId}_akinatorStep`, akiSession.currentStep); // Update step count for the group
      return client.replyMessage(event.replyToken, {
        type: "text",
        text: `Question ${akiSession.currentStep + 1}: ${
          akiSession.question
        }\nAnswers:\n1. Yes\n2. No\n3. Don't know\n4. Probably\n5. Probably not\n\n... or type "/end" to end the game`,
      });
    }
  }

  // Ignore messages from users who didn't start the game
  return false;
};
