module.exports = async (event, client, blobClient) => {
  // When bot joins a group or room
  // Use the reply API to send the welcome message
  await client.replyMessage({
    replyToken: event.replyToken,
    messages: [
      {
        type: "text",
        text: 'Thank you for inviting me! use my prefix "!" to start using commands',
      },
    ],
  });
};
