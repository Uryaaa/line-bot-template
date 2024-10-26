module.exports = {
  command: "help",
  aliases: ["commands", "h"],
  category: "utility",
  description: "Displays a list of available commands",
  handler: (client, blobClient, event, args) => {
    const categories = [...new Set(client.commands.map((x) => x.category))]; // Get a list of unique categories

    if (!args[0]) {
      // If no argument is provided, show a list of commands grouped by category
      const categoryList = categories
        .map((category) => {
          const commandsInCategory = client.commands
            .filter((x) => x.category === category)
            .map((x) => "[" + x.command + "]")
            .join(", ");
          return `${
            category.charAt(0).toUpperCase() + category.slice(1)
          } commands\n${commandsInCategory}`;
        })
        .join("\n\n");

      client.replyMessage({
        replyToken: event.replyToken,
        messages: [
          {
            type: "text",
            text: `List of available commands:\n\n${categoryList}`,
            quoteToken: event.message.quoteToken,
          },
        ],
      });
    } else {
      const categoryRequested = args[0].toLowerCase();
      if (categories.includes(categoryRequested)) {
        // If the argument is a category name, show commands in that category
        const commandsInCategory = client.commands
          .filter((x) => x.category === categoryRequested)
          .map((x) => "[" + x.command + "]")
          .join(", ");

        client.replyMessage({
          replyToken: event.replyToken,
          messages: [
            {
              type: "text",
              text: `Commands in the ${categoryRequested} category:\n${commandsInCategory}`,
              quoteToken: event.message.quoteToken,
            },
          ],
        });
      } else {
        // Check if the argument is a command or an alias
        const command =
          client.commands.get(args[0]) ||
          client.commands.find(
            (x) => x.aliases && x.aliases.includes(args.join(" ").toLowerCase())
          );

        if (!command) {
          return client.replyMessage({
            replyToken: event.replyToken,
            messages: [
              {
                type: "text",
                text: "Command or category not found.",
                quoteToken: event.message.quoteToken,
              },
            ],
          });
        }

        client.replyMessage({
          replyToken: event.replyToken,
          messages: [
            {
              type: "text",
              text: `Command: ${command.command}\nDescription: ${
                command.description
              }\nAliases: ${command.aliases.join(", ")}\nCategory: ${
                command.category
              }`,
            },
          ],
        });
      }
    }
  },
};
