module.exports = {
  command: "template",
  aliases: ["button"],
  category: "example",
  description: "Template message example",
  handler: (client, event) => {
    //
    client.replyMessage(event.replyToken, {
      type: "template",
      altText: "Buttons alt text",
      template: {
        type: "buttons",
        thumbnailImageUrl:`${process.env.baseurl}/image/line.png`,
        title: "My button sample",
        text: "Hello, my button",
        actions: [
          { label: "Go to line.me", type: "uri", uri: "https://line.me" },
          { label: "Say hello1", type: "postback", data: "hello こんにちは" },
          {
            label: "言 hello2",
            type: "postback",
            data: "hello こんにちは",
            text: "hello こんにちは",
          },
          { label: "Say message", type: "message", text: "Rice=米" },
        ],
      },
    });
  },
};
