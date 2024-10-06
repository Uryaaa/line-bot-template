
// Use the reply API to send the welcome message
module.exports = {
  command: "audio",
  aliases: ["music"],
  category: "example",
  description: "Audio message example",
  handler: (client, event) => {
    //
    client.replyMessage(event.replyToken, {
      type: "audio",
      originalContentUrl: `${process.env.baseurl}/audio/vine-boom.mp3`,
      duration: 1000,
    });
  },
};
