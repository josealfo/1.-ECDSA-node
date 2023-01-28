const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { hexToBytes, toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

const privKey = secp.utils.randomPrivateKey();
const pubKey = secp.getPublicKey(privKey);
/*
const msgHash = await secp.utils.sha256('hello world');
const signature = await secp.sign(msgHash, privKey);
*/
const isValid = secp.verify(signature, msgHash, pubKey);

console.log("isValid=", isValid);
