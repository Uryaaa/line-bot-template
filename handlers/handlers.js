const handleEcho = require("../handlers/echoHandler");
const handleAkinator = require("../handlers/akinatorHandler");
const handleContent = require("../handlers/contentHandler");

module.exports = async (client, blobClient, event) => {
  // Always check if the content handler can process this event, even for non-text messages
  const isContentHandled = await handleContent(client, blobClient, event);
  if (isContentHandled) {
    return true; // Content handler processed the event, no need to proceed further
  }

  // Now, only proceed with text messages for echo and akinator modes
  if (event.message.type !== "text") {
    return true; // Ignore non-text messages if content mode isn't active
  }

  // Check if Echo or Akinator mode is active first
  const isEchoHandled = await handleEcho(client, event);
  if (isEchoHandled) {
    return true; // Echo mode handled, no need to process further
  }

  const isAkinatorHandled = await handleAkinator(client, event);
  if (isAkinatorHandled) {
    return true; // Akinator mode handled, no need to process further
  }

  return false; // None of the handlers took action, proceed with command processing
};
