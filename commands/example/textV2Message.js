// Find emoji ID : https://developers.line.biz/en/docs/messaging-api/emoji-list/#line-emoji-definitions

module.exports = {
  command: "textv2",
  aliases: ["txt2"],
  category: "example",
  description: "TextV2 example message",
  handler: async (client, blobClient, event) => {

    client.replyMessage({
      replyToken: event.replyToken,
      messages: [
        {
          type: "textV2",
          text: "Hello {user}, have a good day {happy}",
          subtitution: {
            user: {
              type: "mention",
              mentionee: {
                type: "user",
                userId: event.source.userId,
              },
            },
            happy: {
              type: "emoji",
              productId: "5ac1bfd5040ab15980c9b435",
              emojiId: "002",
            },
          },
        },
      ],
    });
    
  }
};