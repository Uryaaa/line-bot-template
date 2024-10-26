module.exports = {
  command: "flex",
  aliases: ["carousel"],
  category: "example",
  description: "Flex message example",
  handler: (client, blobClient, event) => {
    client.replyMessage({
      replyToken: event.replyToken,
      messages: [
        {
          type: "flex",
          altText: "This is a flex message",
          contents: {
            type: "bubble",
            hero: {
              type: "image",
              url: `${process.env.baseurl}/image/line.png`, // Example image URL
              size: "full",
              aspectRatio: "20:13",
              aspectMode: "cover",
            },
            body: {
              type: "box",
              layout: "vertical",
              contents: [
                {
                  type: "text",
                  text: "Flex Message Example",
                  weight: "bold",
                  size: "xl",
                },
                {
                  type: "text",
                  text: "This is an example of a Flex message.",
                  size: "sm",
                  color: "#999999",
                },
              ],
            },
            footer: {
              type: "box",
              layout: "vertical",
              spacing: "sm",
              contents: [
                {
                  type: "button",
                  style: "link",
                  height: "sm",
                  action: {
                    type: "uri",
                    label: "Go to line.me",
                    uri: "https://line.me",
                  },
                },
                {
                  type: "button",
                  style: "link",
                  height: "sm",
                  action: {
                    type: "postback",
                    label: "Say hello",
                    data: "hello",
                  },
                },
              ],
              flex: 0,
            },
          },
        },
      ],
    });
  },
};
