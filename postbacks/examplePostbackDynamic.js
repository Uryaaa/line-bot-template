module.exports = {
  postbackData: "sticker_", // Prefix for dynamic sticker postbacks
  handler: (client, event, id) => {
    const stickerId = parseInt(id, 10); // Convert the ID to an integer
    client.replyMessage(event.replyToken, {
      type: "sticker",
      packageId: "1070",
      stickerId: stickerId, // Use the dynamic sticker ID
    });
  },
};
