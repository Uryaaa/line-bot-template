module.exports = async (event, client, blobClient) => {
// when a user leaves the room
  // Use the reply API to send the goodbye message
  await client.replyMessage({
    replyToken: event.replyToken,
    messages: [
      {
        type: "text",
        text: "Until we meet again!",
      },
    ],
  });
};
