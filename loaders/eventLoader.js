const fs = require("fs");
const path = require("path");

function loadEvents(client, app, config) {
  const events = {};
  const eventsPath = path.join(__dirname, "../events");

  // Load each file in the events folder and associate it with its event type
  fs.readdirSync(eventsPath).forEach((file) => {
    const eventModule = require(path.join(eventsPath, file));
    const eventType = path.basename(file, ".js");
    console.log(`Loading event ${eventType}`);
    events[eventType] = eventModule;
  });

  // Define the callback route
  app.post(
    "/callback",
    require("@line/bot-sdk").middleware(config),
    async(req, res) => {
      await Promise.all(
        req.body.events.map(async (event) => {
          const eventType = event.type;

          // Check if the event type is handled, and call the corresponding handler
          if (events[eventType]) {
            await events[eventType](event, client);
          } else {
            console.log(`No handler for event type: ${eventType}`);
          }
        })
      )
        .then((result) => res.json(result))
        .catch((err) => {
          console.error(err);
          res.status(500).end();
        });
    }
  );
}

module.exports = { loadEvents };
