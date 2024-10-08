// Use the reply API to send the welcome message
module.exports = {
  command: "imagemap",
  aliases: ["map"],
  category: "example",
  description: "Imagemap message example",
  handler: (client, event) => {
    //
    client.replyMessage(event.replyToken, {
      type: "imagemap",
      baseUrl: `${process.env.baseurl}/imagemap`,
      altText: "Imagemap alt text",
      baseSize: { width: 1040, height: 1040 },
      actions: [
        {
          area: { x: 0, y: 0, width: 520, height: 520 },
          type: "uri",
          linkUri: "https://store.line.me/family/manga/en",
        },
        {
          area: { x: 520, y: 0, width: 520, height: 520 },
          type: "uri",
          linkUri: "https://store.line.me/family/music/en",
        },
        {
          area: { x: 0, y: 520, width: 520, height: 520 },
          type: "uri",
          linkUri: "https://store.line.me/family/play/en",
        },
        {
          area: { x: 520, y: 520, width: 520, height: 520 },
          type: "message",
          text: "URANAI!",
        },
      ],
      video: {
        originalContentUrl: `${process.env.baseurl}/video/video-ncs.mp4`,
        previewImageUrl: `${process.env.baseurl}/image/video-example-thumbnail.jpg`,
        area: {
          x: 280,
          y: 385,
          width: 480,
          height: 270,
        },
        externalLink: {
          linkUri: "https://line.me",
          label: "LINE",
        },
      },
    });
  },
};
