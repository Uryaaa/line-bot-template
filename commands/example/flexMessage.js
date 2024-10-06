// Use the reply API to send the welcome message
module.exports = {
  command: "flex",
  aliases: ["carousel"],
  category: "example",
  description: "Flex message example",
  handler: (client, event) => {
    //
    client.replyMessage(event.replyToken, {
      type: "template",
      altText: "Carousel alt text",
      template: {
        type: "carousel",
        columns: [
          {
            thumbnailImageUrl:`${process.env.baseurl}/image/line.png`,
            title: "hoge",
            text: "fuga",
            actions: [
              { label: "Go to line.me", type: "uri", uri: "https://line.me" },
              {
                label: "Say hello1",
                type: "postback",
                data: "hello こんにちは",
              },
            ],
          },
          {
            thumbnailImageUrl:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6dWIrCGzgkudyokIJdxObt6Ln9Kojbb-bQg&sL",
            title: "hoge",
            text: "fuga",
            actions: [
              {
                label: "言 hello2",
                type: "postback",
                data: "hello こんにちは",
                text: "hello こんにちは",
              },
              { label: "Say message", type: "message", text: "Rice=米" },
            ],
          },
        ],
      },
    });
  },
};
