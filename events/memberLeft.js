module.exports = async (event, client) => {
// when a user leaves the room
  // Use the reply API to send the goodbye message
  await client.replyMessage(event.replyToken, {
    type: "text",
    text: "Until we meet again!",
  });
};
