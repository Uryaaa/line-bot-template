# LINE Messager bot template
Starter template for LINE Messager bot aiming for easy LINE bot creation
## 🔩 Requirements

* **Node.js** 18 or higher
## ⚙️ Bot setup
- Create account and official account [here](https://account.line.biz/login)
- Clone this repo
- Install all the package
  ```
  npm install
  ```
- make `.env` file and fill with your respective information
  ```
  channelAccessToken= // Bot access token
  channelSecret=      // Bot channel secret
  baseurl=            // Server callback url
  ```
- start the bot
  ```
  node .
  ```
## 🆖 Using ngrok
[Ngrok](https://ngrok.com/) URL can be directly registered as the webhook URL in LINE Developers console means you can host your bot on your system
![image](https://github.com/user-attachments/assets/4f7006ba-191d-46a5-96dc-e1001adf6cf3)
## 🤖 Easily create new commands
you can make new command by creating `.js` file on the commands/{category} folder like this
```js
module.exports = {
  command: 'text',
  aliases: ['ping'],
  category: "example",
  description: 'Text message example',
  handler: (client, event) => {
    
    client.replyMessage(event.replyToken, {
      type: 'text',
      text: 'This is text message example'
    });
  },
};
```
And Many more example of `event.message.type` are included
## 📖 LINE API Documentation

See the official API documentation for more information

- English: https://developers.line.biz/en/docs/messaging-api/overview/
- Japanese: https://developers.line.biz/ja/docs/messaging-api/overview/

line-bot-sdk-nodejs documentation: https://line.github.io/line-bot-sdk-nodejs/#getting-started

## 🩹 Contributing
Feel free to fork and make a pull request 

