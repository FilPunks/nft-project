const { NFTStorage, File, Blob } = require('nft.storage');
const fs = require('fs');
require('dotenv').config();

const pathToPunks = '.filpunk/filpunks';
const client = new NFTStorage({ token: process.env.NFT_STORAGE_TOKEN });
console.log('+++ TOKEN: ', process.env.NFT_STORAGE_TOKEN);

// Define an array to store the File objects
let files = [];

// Read the files in the directory
punkNames = fs.readdirSync(pathToPunks)

// Loop through each file and create a File object
for (let i = 0; i < punkNames.length; i++) {
  let fileName = punkNames[i];
  let filePath = `${pathToPunks}/${fileName}`;

  // console.log('+++ fileName: ', punkNames[i]);
  let file = new File([fs.readFileSync(filePath)], fileName);
  files.push(file);    
}

console.log('+++ Files: ', files);

// const cid = client.storeDirectory(files);
// console.log('+++ CID: ', cid);

async function nftStorage() {
  const cid = await client.storeDirectory(files);
  return cid;
}

nftStorage().then(cid => {
  console.log('+++ CID: ', cid);
}).catch(error => {
  console.error(error);
});



