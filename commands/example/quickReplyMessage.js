module.exports = {
  command: "quickreply",
  aliases: ["quick"],
  category: "example",
  description: "Quick Reply message object example",
  handler: (client, event) => {
    // Send a 
    client.replyMessage(event.replyToken, {
      type: "text",
      text: "This is text message example",
      quickReply: {
        items: [
          {
            type: "action",
            action: {
              type: "cameraRoll",
              label: "Send photo",
            },
          },
          {
            type: "action",
            action: {
              type: "camera",
              label: "Open camera",
            },
          },
        ],
      },
    });
  },
};
