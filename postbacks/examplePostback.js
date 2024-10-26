module.exports = {
  postbackData: "hello こんにちは", // No id needed
  handler: (client, blobClient, event) => {
    client.replyMessage({
      replyToken: event.replyToken,
      messages: [
        {
          type: "text",
          text: "hello こんにちは",
        },
      ],
    });
  },
};
