module.exports = {
  command: "location",
  aliases: ["place"],
  category: "example",
  description: "Location message example",
  handler: (client, event) => {
    //
    client.replyMessage(event.replyToken, {
      type: "location",
      title: "my location",
      address: "1-3 Kioicho, Chiyoda-ku, Tokyo, 102-8282, Japan",
      latitude: 35.67966,
      longitude: 139.73669,
    });
  },
};
