module.exports = async (event, client, blobClient) => {
  // When someone follow the bot
  // Use the reply API to send the welcome message
  await client.replyMessage({
    replyToken: event.replyToken,
    messages: [
      {
        type: "text",
        text: 'Thank you for following me! use my prefix "!" to start using commands',
      },
    ],
  });
};
