module.exports = async (event, client) => {
  // When bot joins a group or room
  const replyMessage = { type: "text", text: "Thank you for inviting me!" };

  // Use the reply API to send the welcome message
  await client.replyMessage(event.replyToken, [replyMessage]);
};
