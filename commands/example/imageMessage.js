module.exports = {
  command: "image",
  aliases: ["picture", "img"],
  category: "example",
  description: "image message example",
  handler: (client, blobClient, event) => {
    client.replyMessage({
      replyToken: event.replyToken,
      messages: [
        {
          type: "image",
          originalContentUrl: `${process.env.baseurl}/image/line.png`,
          previewImageUrl: `${process.env.baseurl}/image/line.png`,
        },
      ],
    });
  },
};
