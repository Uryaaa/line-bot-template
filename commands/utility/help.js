module.exports = {
  command: "help",
  aliases: ["commands", "h"],
  category: "utility",
  description: "Menampilkan daftar command yang tersedia",
  handler: (client, event, args) => {
     if (!args[0]) {
      const utility = client.commands
        .filter((x) => x.category == "utility")
        .map((x) => "[" + x.command + "]")
        .join(", ");
      const example = client.commands
        .filter((x) => x.category == "example")
        .map((x) => "[" + x.command + "]")
        .join(", ");
         client.replyMessage(event.replyToken, { 
         type: "text",
         text: `Utility commands\n${utility}\n\nExample commands\n${example}` });
     }
     else {
       const command =
         client.commands.get(args[0]) ||
         client.commands.find(
           (x) => x.aliases && x.aliases.includes(args.join(" ").toLowerCase())
         );;
       if (!command) return client.replyMessage(event.replyToken, { type: "text", text: "Command not found" });
       client.replyMessage(event.replyToken, {
         type: "text",
         text: `Command: ${command.command}\nDescription: ${command.description}\nAliases: ${command.aliases.join(", ")}\nCategory: ${command.category}`,
       });
     }



  },
};
