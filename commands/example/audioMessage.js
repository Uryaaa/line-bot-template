module.exports = {
  command: "audio",
  aliases: ["music"],
  category: "example",
  description: "Audio message example",
  handler: (client, event) => {
    // Send audio file from static/audio/vine-boom.mp3
    client.replyMessage(event.replyToken, {
      type: "audio",
      originalContentUrl: `${process.env.baseurl}/audio/vine-boom.mp3`,
      duration: 1000,
    });
  },
};
