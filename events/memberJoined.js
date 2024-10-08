module.exports = async (event, client) => {
  // When someone joins the group, send a welcome message
  // Use the reply API to send the welcome message
  await client.replyMessage(event.replyToken, {
    type: "text",
    text: "Hey, welcome!",
  });
};
