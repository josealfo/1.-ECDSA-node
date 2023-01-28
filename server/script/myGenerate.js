const secp = require("ethereum-cryptography/secp256k1");
//const { utf8ToBytes } = require("ethereum-cryptography/utils");
//const { hexToBytes, toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const { toHex } = require("ethereum-cryptography/utils");

const myPrivKey = secp.utils.randomPrivateKey();
console.log("Private Key: ", toHex(myPrivKey));

const myPubKey = secp.getPublicKey(myPrivKey);
console.log("Public Key: ", toHex(myPubKey));