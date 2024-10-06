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

      // Ambil nilai yang tersimpan di database atau default 0 (gunakan await)
      const prevNum = await db.get(`sum_${event.source.userId}`) || 0;

      // Tambahkan angka baru ke sum
      const newNum = prevNum + input;

      // Simpan nilai yang baru ke database
      await db.set(`sum_${event.source.userId}`, newNum);

      // Kembalikan pesan dengan nilai yang diperbarui
      client.replyMessage(event.replyToken, {
        type: "text",
        text: `Nilai sekarang adalah: ${newNum}`,
      });
    } catch (error) {
      console.error("Error in add command:", error);
      client.replyMessage(event.replyToken, {
        type: "text",
        text: "Terjadi kesalahan. Mohon coba lagi nanti.",
      }); 
    }
  },
};
