// In this example, we using type:"button"
// other template types can be found here : https://developers.line.biz/en/reference/messaging-api/#template-messages

module.exports = {
  command: "template",
  aliases: ["button"],
  category: "example",
  description: "Template message example",
  handler: (client, blobClient, event) => {
    //
    client.replyMessage({
      replyToken: event.replyToken,
      messages: [
        {
          type: "template",
          altText: "Buttons alt text",
          template: {
            type: "buttons",
            thumbnailImageUrl: `${process.env.baseurl}/image/line.png`,
            title: "My button sample",
            text: "Hello, my button",
            actions: [
              { label: "Go to line.me", type: "uri", uri: "https://line.me" },
              {
                label: "Say hello1",
                type: "postback",
                data: "hello こんにちは",
              },
              {
                label: "言 hello2",
                type: "postback",
                data: "hello こんにちは",
                text: "hello こんにちは",
              },
              { label: "Say message", type: "message", text: "Rice=米" },
            ],
          },
        },
      ],
    });
  },
};
