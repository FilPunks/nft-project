const { Web3Storage } = require('web3.storage');
const { getFilesFromPath } = require('web3.storage');
const fs = require('fs');
require('dotenv').config();

const pathToMeta = '.filpunk/filpunks_meta';
const client = new Web3Storage({ token: process.env.WEB3_STORAGE_TOKEN });
console.log('+++ WEB3 TOKEN: ', process.env.WEB3_STORAGE_TOKEN);

async function w3Storage() {
  const files = await getFilesFromPath(pathToMeta);
	const rootCid = await client.put(files, {wrapWithDirectory: false});
}

w3Storage().then(rootCid => {
  console.log('+++ ROOT CID: ', rootCid);
}).catch(error => {
  console.error(error);
});



