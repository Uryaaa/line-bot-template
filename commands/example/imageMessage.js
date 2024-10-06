module.exports = {
  command: "image",
  aliases: ["picture", "img"],
  category: "example",
  description: "image message example",
  handler: (client, event) => {
    client.replyMessage(event.replyToken, {
      type: "image",
      originalContentUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6dWIrCGzgkudyokIJdxObt6Ln9Kojbb-bQg&s",
      previewImageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6dWIrCGzgkudyokIJdxObt6Ln9Kojbb-bQg&s",
    });
  },
};
