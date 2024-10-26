module.exports = {
  command: "audio",
  aliases: ["music"],
  category: "example",
  description: "Audio message example",
  handler: (client, blobClient, event) => {
    // Send audio file from static/audio/vine-boom.mp3
      client.replyMessage({
        replyToken: event.replyToken,
        messages: [
          {
            type: "audio",
            originalContentUrl: `${process.env.baseurl}/audio/vine-boom.mp3`,
            duration: 1000,
          },
        ],
      });
  }
}