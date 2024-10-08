const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
  command: "add",
  aliases: [],
  category: "utility",
  description: "Menambahkan angka ke database",
  handler: async (client, event, args) => {
    // Pastikan handler adalah async
    try {
      // Ambil angka dari args
      const input = parseInt(args[0]);

      if (isNaN(input)) {
        client.replyMessage(event.replyToken, {
          type: "text",
          text: "Mohon masukkan angka yang valid.",
        });
      }

      const prevNum = await db.get(`sum_${event.source.userId}`) || 0;

      const newNum = prevNum + input;

      await db.set(`sum_${event.source.userId}`, newNum);

      client.replyMessage(event.replyToken, {
        type: "text",
        text: `Current Number : ${newNum}`,
      });
    } catch (error) {
      console.error("Error in add command:", error);
      client.replyMessage(event.replyToken, {
        type: "text",
        text: "Check console log ",
      }); 
    }
  },
};
