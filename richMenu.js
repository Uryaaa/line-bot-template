const { join } = require("path");
const { readFileSync } = require("fs");

const setupRichMenu = async (client, blobClient) => {
  const richmenu = () => ({
    size: {
      width: 2500,
      height: 1686,
    },
    selected: false,
    name: "Test the default rich menu",
    chatBarText: "Tap to open",
    areas: [
      {
        bounds: {
          x: 0,
          y: 0,
          width: 1666,
          height: 1686,
        },
        action: {
          type: "uri",
          label: "Tap area A",
          uri: "https://developers.line.biz/en/news/",
        },
      },
      {
        bounds: {
          x: 1667,
          y: 0,
          width: 834,
          height: 843,
        },
        action: {
          type: "uri",
          label: "Tap area B",
          uri: "https://lineapiusecase.com/en/top.html",
        },
      },
      {
        bounds: {
          x: 1667,
          y: 844,
          width: 834,
          height: 843,
        },
        action: {
          type: "uri",
          label: "Tap area C",
          uri: "https://techblog.lycorp.co.jp/en/",
        },
      },
    ],
  });
  // First we delete the existing rich menu if any
  client.getRichMenuList()
    .then((richmenuList) => {
      for (var i = 0; i < richmenuList.length; i++) {
        client.deleteRichMenu(richmenuList[i].richMenuId);
      }
      console.log("Done deleting ALL rich menu");
    })
    .catch((err) => {
      console.log(err);
    });

  // Don't forget to delete the alias if any
  client.getRichMenuAliasList()
    .then((richmenuListAlias) => {
      for (var i = 0; i < richmenuListAlias.aliases.length; i++) {
        client.deleteRichMenuAlias(
          richmenuListAlias.aliases[i].richMenuAliasId
        );
      }
      console.log("Done deleting ALL rich menu alias");
    })
    .catch((err) => {
      console.log(err);
    });

  // Create the Rich Menu
  const richMenuId = await client.createRichMenu(richmenu());

  // Read the image file as a buffer
  const filepathA = join(__dirname, "./static/image/rich.png");
  const bufferA = readFileSync(filepathA); // Read the file as a buffer

  // Upload the Rich Menu image
  await blobClient.setRichMenuImage(richMenuId, bufferA);

  // Set the rich menu as the default
  await client.setDefaultRichMenu(richMenuId);

  // Set the rich menu alias
  client.createRichMenuAlias(richMenuId, "richmenualias")
  client.getRichMenuAliasList()
  .then((res) => {
    console.log(`Rich menu has been displayed. id : ${richMenuId} | ${res.aliases[0].richMenuAliasId}`);
  })
  .catch((err) => {
    console.log(err);
  });
};

module.exports = { setupRichMenu };
