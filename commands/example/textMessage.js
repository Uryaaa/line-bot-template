module.exports = {
  command: 'text',
  aliases: ['ping'],
  category: "example",
  description: 'Text message example',
  handler: (client, event, args) => {
    
    client.replyMessage(event.replyToken, {
      type: "text",
      text: "This is text message example, ",
      quoteToken: event.message.quoteToken, // Reply to the message
      sender: {
        name: "Bot",
        iconUrl: `${process.env.baseurl}/image/line.png`,
      },
    });
  },
};
