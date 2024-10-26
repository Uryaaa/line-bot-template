// More about this : https://developers.line.biz/en/docs/messaging-api/use-loading-indicator/

module.exports = {
  command: "loading",
  aliases: ["wait"],
  category: "example",
  description: "Display loading message example",
  handler: (client, blobClient, event, args) => {
    if (event.source.type === "user") { // Sadly this feature won't work on type "group"
     

      // Show loading animation for 60 seconds
      client.showLoadingAnimation({
        chatId: event.source.userId,
        loadingSeconds: 60,
      });

      // Wait until the loading animation finishes (60 seconds)
      setTimeout(() => {
        // Send the message after the loading completes
        client.replyMessage({
          replyToken: event.replyToken,
          messages: [
            {
              type: "text",
              text: "Loading complete!",
              quoteToken: event.message.quoteToken, // Reply to the referenced message
              notificationDisabled: false, // If set to true, users will not receive a notification
              sender: {
                name: "Bot",
                iconUrl: `${process.env.baseurl}/image/line.png`,
              },
            },
          ],
        });
      }, 60000); // 60000 ms = 60 seconds
    } else {
      // Warning if loading animation is attempted outside one-on-one chat
      client.replyMessage({
        replyToken: event.replyToken,
        messages: [
          {
            type: "text",
            text: "Warning: Loading animation only works in one-on-one chat.",
          },
        ],
      });
    }
  },
};
