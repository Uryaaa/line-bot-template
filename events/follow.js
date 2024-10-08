module.exports = async (event, client) => {
  // When someone follow the bot
  // Use the reply API to send the welcome message
  await client.replyMessage(event.replyToken, {
    type: "text",
    text: 'Thank you for following me! use my prefix "!" to start using commands',
  });
};
