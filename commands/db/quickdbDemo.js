const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
  command: "add",
  aliases: [],
  category: "utility",
  description: "Menambahkan angka ke database",
  handler: async (client, blobClient, event, args) => {
    // Pastikan handler adalah async
    try {
      // Ambil angka dari args
      const input = parseInt(args[0]);

      if (isNaN(input)) {
        client.replyMessage({
          replyToken: event.replyToken,
          messages: [
            { 
              type: "text", 
              text: "Invalid input. Please enter a number." 
            }

          ],
        });
      }

      const prevNum = await db.get(`sum_${event.source.userId}`) || 0;

      const newNum = prevNum + input;

      await db.set(`sum_${event.source.userId}`, newNum);

      client.replyMessage({
        replyToken: event.replyToken,
        messages: [
          {
            type: "text",
            text: `Current sum: ${newNum}`
          }
        ],
      });
    } catch (error) {
      console.error("Error in add command:", error);
      client.replyMessage({
        replyToken: event.replyToken,
        messages: [
          {
            type: "text",
            text: "An error occurred while processing your request."
          }
        ],
      }); 
    }
  },
};
