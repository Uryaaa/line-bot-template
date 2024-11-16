module.exports = async (event, client, blobClient) => {
  // Check if the event is a postback
  if (event.postback && event.postback.data) {
    const postbackData = event.postback.data;

    // Try to retrieve the corresponding handler directly
    let postback = client.postbacks.get(postbackData);

    // If not found, check for patterns that may include an ID
    if (!postback) {
      // Loop through all registered postbacks
      client.postbacks.forEach((value, key) => {
        // Check for patterns like 'stickerPostbackData=17842'
        if (postbackData.startsWith(key)) {
          postback = value; // Set the postback handler that matches the key
        }
      });
    }

    // Check if a handler was found
    if (postback && typeof postback.handler === "function") {
      let id; // Declare id variable

      // If the postbackData includes an ID, extract it
      if (postbackData.includes("PostbackData=")) {
        id = postbackData.split("PostbackData=")[1];
        postback.handler(client, blobClient, event, id); // Call handler with id
      } else {
        postback.handler(client, blobClient, event); // Call handler without id
      }

      console.log(`Postback handler found for: ${postbackData}`);
    } else {
      // If no handler is found, send a fallback message
      client.replyMessage({
        replyToken: event.replyToken,
        messages: [
          {
            type: "text",
            text: `No handler found for postback data: ${postbackData}`,
          },
        ],
      });
    }
  }
};
