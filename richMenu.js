const { join } = require("path");
const { readFileSync } = require("fs");

const setupRichMenu = async (client) => {
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

  // Create the Rich Menu
  const richMenuId = (await client.createRichMenu(richmenu()));

  // Read the image file as a buffer
  const filepathA = join(__dirname, "./static/image/rich.png");
  const bufferA = readFileSync(filepathA); // Read the file as a buffer

  // Upload the Rich Menu image
  await client.setRichMenuImage(richMenuId, bufferA);

  // Set the rich menu as the default
  await client.setDefaultRichMenu(richMenuId);

  // Create an alias for the Rich Menu
  await client.createRichMenuAlias({
    richMenuId: richMenuId,
    richMenuAliasId: "richId",
  });
};

module.exports = { setupRichMenu };
