module.exports = {
  command: 'text',
  aliases: ['ping'],
  category: "example",
  description: 'Text message example',
  handler: (client, blobClient, event, args) => {
    client.replyMessage({
      replyToken: event.replyToken,
      messages: [
        {
          type: "text",
          text: "This is text message example, ",
          quoteToken: event.message.quoteToken, // Reply to the message
          notificationDisabled: false, // if set to true user(s) wont receive notification 
          sender: {
            name: "Bot",
            iconUrl: `${process.env.baseurl}/image/line.png`,
            
          },
        },
      ],
    });
  },
};
