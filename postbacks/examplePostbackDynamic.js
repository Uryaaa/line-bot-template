// see : events\postback.js
// to try using this, modify commands\example\templateMessage.js or commands\example\flex.js
// change its data to "sticker_{stickerId}"
// Usable sticker can be found at : https://developers.line.biz/en/docs/messaging-api/sticker-list/
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
