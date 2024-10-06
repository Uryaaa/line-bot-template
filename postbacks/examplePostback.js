module.exports = {
  postbackData: "hello こんにちは", // No id needed, just 'ping'
  handler: (client, event) => {
    client.replyMessage(event.replyToken, {
      type: "text",
      text: "hello こんにちは",
    });
  },
};
