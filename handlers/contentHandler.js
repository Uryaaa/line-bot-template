const { QuickDB } = require("quick.db");
const db = new QuickDB();
const fs = require("fs");
const path = require("path");

// Simplified export as a single function
module.exports = async (client, event) => {
  const userId = event.source.userId;

  // Check if the user is expected to upload an image
  const awaitingImage = await db.get(`awaitingImage_${userId}`);

  if (awaitingImage) {
    if (event.message.type === "image") {
      // Get image content
      let stream = await client.getMessageContent(event.message.id);

      let chunks = [];
      stream.on("data", (chunk) => {
        chunks.push(chunk); // Gather the binary data
      });

      stream.on("end", async () => {
        const buffer = Buffer.concat(chunks);

        // Define the file path and save the image
        const dirPath = path.join(__dirname, "../downloads");
        const filePath = path.join(dirPath, `image_${userId}.jpg`);

        // Create the directory if it doesn't exist
        if (!fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath, { recursive: true });
        }

        // Save the image
        fs.writeFileSync(filePath, buffer);

        // Reset the user's state
        await db.delete(`awaitingImage_${userId}`);

        // Respond that the image has been received
        await client.replyMessage(event.replyToken, {
          type: "text",
          text: "Image received! Please check the downloads folder in the project folder.",
        });
      });

      stream.on("error", (err) => {
        console.error("Error downloading content:", err);
      });

      return true; // Image was handled
    } else {
      // If the user sends something other than an image
      return false;
    }
  }

  return false; // Not in content upload mode
};
