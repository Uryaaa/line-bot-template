const handlers = require("../handlers/handlers");

module.exports = async (event, client, blobClient) => {
  const isHandled = await handlers(client, blobClient, event);
  if (isHandled) return;

  const userMessage = event.message.text.toLowerCase();
  const prefix = "!";
  const args = userMessage.slice(prefix.length).trim().split(/ +/);

  if (!userMessage.startsWith(prefix)) return;

  const commandName = args.shift().toLowerCase();

  
  const cmd = 
    client.commands.get(commandName) ||
    Array.from(client.commands.values()).find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );

  try {
    if (cmd) cmd.handler(client, blobClient, event, args);
  } catch (error) {
    return client.replyMessage({
      replyToken: event.replyToken,
      messages: [{
        type: "text",
        text: "An error occurred while executing the command.",
      }],
    });
  }
};