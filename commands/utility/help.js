module.exports = {
  command: "help",
  aliases: ["commands", "h"],
  category: "utility",
  description: "Displays a list of available commands",
  handler: (client, blobClient, event, args) => {
    // Convert Map values to array first
    const allCommands = Array.from(client.commands.values());
    const categories = [...new Set(allCommands.map((x) => x.category))];

    if (!args[0]) {
      const categoryList = categories.map((category) => {
        const commandsInCategory = allCommands
          .filter((x) => x.category === category)
          .map((x) => "[" + x.command + "]")
          .join(", ");
        return `${category.charAt(0).toUpperCase() + category.slice(1)} commands\n${commandsInCategory}`;
      }).join("\n\n");

      client.replyMessage({
        replyToken: event.replyToken,
        messages: [{
          type: "text",
          text: `List of available commands:\n\n${categoryList}`,
          quoteToken: event.message.quoteToken,
        }],
      });
    } else {
      const categoryRequested = args[0].toLowerCase();
      if (categories.includes(categoryRequested)) {
        const commandsInCategory = allCommands
          .filter((x) => x.category === categoryRequested)
          .map((x) => "[" + x.command + "]")
          .join(", ");

        client.replyMessage({
          replyToken: event.replyToken,
          messages: [{
            type: "text",
            text: `Commands in the ${categoryRequested} category:\n${commandsInCategory}`,
            quoteToken: event.message.quoteToken,
          }],
        });
      } else {
        
        const command = 
          client.commands.get(args[0]) ||
          allCommands.find(
            (x) => x.aliases && x.aliases.includes(args.join(" ").toLowerCase())
          );

        if (!command) {
          return client.replyMessage({
            replyToken: event.replyToken,
            messages: [{
              type: "text",
              text: "Command or category not found.",
              quoteToken: event.message.quoteToken,
            }],
          });
        }

        client.replyMessage({
          replyToken: event.replyToken,
          messages: [{
            type: "text",
            text: `Command: ${command.command}\nDescription: ${command.description}\nAliases: ${command.aliases?.join(", ") || "None"}\nCategory: ${command.category}`,
          }],
        });
      }
    }
  },
};