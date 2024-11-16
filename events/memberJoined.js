module.exports = async (event, client, blobClient) => {
  // When someone joins the group, send a welcome message
  // Use the reply API to send the welcome message
  await client.replyMessage({
    replyToken: event.replyToken,
    messages: [
      {
        type: "text",
        text: "Hey, welcome!",
      },
    ],
  });
};
