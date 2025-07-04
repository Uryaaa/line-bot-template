# LINE Messager bot template
Starter template for LINE Messager bot aiming for easy LINE bot creation <br>
[Click Here](https://github.com/Uryaaa/line-bot-template/tree/7.0.0) for template using @line-bot/sdk 7.0.0

## ✅ Features
- [x] Commands handling for easy commands creation
- [x] Dynamic webhook event handling 
- [x] Postback handling for easy postback event creation
- [x] Almost all `message.type` examples are available
- [x] QuickDB examples (intended for local hosting, you probably need to change it if you want to host somewhere else)
- [x] `getMessageContent(message.id)` example usage
- [x] Displaying Rich menu
- [x] **Bonus** : Akinator

## 🔩 Requirements

* **[Node.js](https://nodejs.org/en/download/prebuilt-installer)** 20 or higher
## ⚙️ Bot setup
- Create account and official account [here](https://account.line.biz/login)
- Clone this repo
- Install all the package
  ```
  npm install
  ```
- make `.env` file and fill with your respective information
  ```
  channelAccessToken= # Bot access token
  channelSecret=      # Bot channel secret
  baseurl=            # Server callback url
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
  handler: (client, blobClient, event) => {
    
    client.replyMessage({
      replyToken: event.replyToken,
      messages: [
      {
      type: 'text',
      text: 'This is text message example'
      }
      ]
    });
  },
};
```
Alternatively you can use user snippets that come with this repo :
| **Snippets** | **Descriptions**                  | 
|--------------|-----------------------------------|
| command      | Create new command handler        | 
| replyMessage | create new replyMessage structure | 
| postback     | Create new postback handler       |

see [example](https://github.com/Uryaaa/line-bot-template/tree/main/commands/example) for other `message.type`


## 📃 Displaying rich menu
It's a very rough method of handling rich menu if not the worst :< Uncomment these lines of code below in `index.js` to create a new rich menu everytime bot is running, there is not so many use cases i can think of when using rich menu. Maybe you can.
 
![image](https://github.com/user-attachments/assets/24b10349-e334-4256-8348-599bb98afff8)

More about Rich menu can be found here : [https://developers.line.biz/en/docs/messaging-api/using-rich-menus/](https://developers.line.biz/en/docs/messaging-api/using-rich-menus/)

## 📁 Folder Structure
This is folder structure if you setup the bot correctly
```
/commands
    /db
    /example
    /utility
/downloads
/events
/handlers
/loaders
/node_modules
/postbacks
/static
    /audio
    /image
        /RichMenu_DesignTemplate
    /imagemap
    /video
.env
.gitignore
index.js
package-lock.json
package.json
richMenu.js
```
***Don't modify events and loaders folder unless you know what you're doing**

## 📖 LINE API Documentation

See the official API documentation for more information

- English: https://developers.line.biz/en/docs/messaging-api/overview/
- Japanese: https://developers.line.biz/ja/docs/messaging-api/overview/

line-bot-sdk-nodejs documentation: https://line.github.io/line-bot-sdk-nodejs/#getting-started

## 🩹 Contributing
Feel free to fork and make a pull request 

