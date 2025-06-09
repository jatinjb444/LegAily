const { NFTStorage, Blob } = require("nft.storage");

const API_TOKEN="66ca35bd.0b4d4bf684054fe08fea45939d795016";
const client = new NFTStorage({ token: API_TOKEN });

async function main() {
  try {
    const cid = await client.storeBlob(new Blob(["Hello NFT.Storage!"]));
    console.log("Upload successful! CID:", cid);
  } catch (error) {
    console.error("Upload failed:", error);
  }
}

main();
