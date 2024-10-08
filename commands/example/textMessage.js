module.exports = {
  command: 'text',
  aliases: ['ping'],
  category: "example",
  description: 'Text message example',
  handler: (client, event) => {
    
    client.replyMessage(event.replyToken, {
      type: 'text',
      text: 'This is text message example'
    });
  },
};
