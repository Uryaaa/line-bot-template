module.exports = async (event, client) => {
  // When bot joins a group or room
  // Use the reply API to send the welcome message
  await client.replyMessage(event.replyToken,{ 
    type: "text", 
    text: 'Thank you for inviting me! use my prefix "!" to start using commands'
  })
};
