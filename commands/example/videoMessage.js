
module.exports = {
  command: "video",
  aliases: ["douga"],
  category: "example",
  description: "video message example",
  handler: (client, event) => {
    //
    client.replyMessage(event.replyToken, {
      type: "video",
      originalContentUrl: `${process.env.baseurl}/video/video-ncs.mp4`,
      previewImageUrl: `${process.env.baseurl}/image/video-example-thumbnail.jpg`,
    });
  },
};
