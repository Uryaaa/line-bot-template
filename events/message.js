module.exports = async (event, client) => {
  if (event.message.type !== "text") {
    return; // Ignore non-text messages
  }

  const userMessage = event.message.text.toLowerCase();
  const prefix = '!'
  const args = userMessage.slice(prefix.length).trim().split(/ +/);
  // Check if the message starts with the prefix
  if (!userMessage.startsWith(prefix)) {
    return; // Ignore messages without the prefix
  }

  // Extract the command after the prefix


  // Check if the command matches any loaded command or alias, and run the corresponding handler
const commandName = args.shift().toLowerCase();

    const cmd =
      client.commands.get(commandName) ||
      client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );
    try {
      if (cmd) cmd.handler(client, event, args);
    } catch (error) {
      console.log(error);
    }
  }
