const { NFTStorage, Blob } = require("nft.storage");

const API_TOKEN = "1b18c8d1.66453d7f05584a8babf7e46efffa815c";

async function test() {
  const client = new NFTStorage({ token: API_TOKEN });
  try {
    const cid = await client.storeBlob(new Blob(["hello world"]));
    console.log("CID:", cid);
  } catch (e) {
    console.error(e);
  }
}

test();
