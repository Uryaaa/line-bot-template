module.exports = {
  command: "image",
  aliases: ["picture", "img"],
  category: "example",
  description: "image message example",
  handler: (client, event) => {
    client.replyMessage(event.replyToken, {
      type: "image",
      originalContentUrl:`${process.env.baseurl}/image/line.png`,
      previewImageUrl:`${process.env.baseurl}/image/line.png`,
    });
  },
};
