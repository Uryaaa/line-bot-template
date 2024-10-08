// Sticker List https://developers.line.biz/en/docs/messaging-api/sticker-list/
module.exports = {
  command: "sticker",
  aliases: ["stamp"],
  category: "example",
  description: "Sticker message example",
  handler: (client, event) => {
    //
    client.replyMessage(event.replyToken, {
      type: "sticker",
      packageId: "1070",
      stickerId: "17843",
    });
  },
};
