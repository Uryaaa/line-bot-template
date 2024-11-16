const handlers = require("../handlers/handlers");

module.exports = async (event, client, blobClient) => {
  // Call the centralized handlers
  const isHandled = await handlers(client, blobClient, event);
  if (isHandled) {
    return; // If the event was handled by content, echo, or akinator, stop further processing
  }

  // Now, handle text-based commands
  const userMessage = event.message.text.toLowerCase();
  const prefix = "!";
  const args = userMessage.slice(prefix.length).trim().split(/ +/);

  // Now, check if the message starts with the prefix for regular commands
  if (!userMessage.startsWith(prefix)) {
    return; // Ignore messages without the prefix if no special modes are active
  }

  // Extract the command after the prefix
  const commandName = args.shift().toLowerCase();

  // Check if the command matches any loaded command or alias, and run the corresponding handler
  const cmd =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );

  try {
    if (cmd) cmd.handler(client, blobClient, event, args); // Pass blobClient to the command handler
  } catch (error) {
    return client.replyMessage({
      replyToken: event.replyToken,
      messages: [
        {
          type: "text",
          text: "An error occurred while executing the command.",
        },
      ],
    });
    
  }
};
