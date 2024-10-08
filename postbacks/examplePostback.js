module.exports = {
  postbackData: "hello こんにちは", // No id needed
  handler: (client, event) => {
    client.replyMessage(event.replyToken, {
      type: "text",
      text: "hello こんにちは",
    });
  },
};
