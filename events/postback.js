module.exports = async (event, client) => {
  // Check if the event is a postback
  if (event.postback && event.postback.data) {
    const postbackData = event.postback.data;

    // Try to retrieve the corresponding handler directly
    let postback = client.postbacks.get(postbackData);

    // If not found, check for patterns that may include an ID
    if (!postback) {
      // Loop through all registered postbacks
      client.postbacks.forEach((value, key) => {
        // Check for patterns like 'sticker_17842'
        if (postbackData.startsWith(key)) {
          postback = value; // Set the postback handler that matches the key
        }
      });
    }

    // Check if a handler was found
    if (postback && typeof postback.handler === "function") {
      let id; // Declare id variable

      // If the postbackData includes an ID, extract it
      if (postbackData.includes("_")) {
        id = postbackData.split("_")[1];
        postback.handler(client, event, id); // Call handler with id
      } else {
        postback.handler(client, event); // Call handler without id
      }

      console.log(`Postback handler found for: ${postbackData}`);
    } else {
      // If no handler is found, send a fallback message
      client.replyMessage(event.replyToken, {
        type: "text",
        text: `no handler found for postback data: ${postbackData}`,
      });
    }
  }
};
