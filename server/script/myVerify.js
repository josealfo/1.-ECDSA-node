(function () {
  // HACK for modules: We keep these variables private inside this closure scope
  

// const { signMessage } = require('./sm');

const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
//const { utf8ToBytes } = require("ethereum-cryptography/utils");
const { hexToBytes, toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
//const { toHex } = require("ethereum-cryptography/utils");


/* Script Generated:
#1
Private Key:  c6a57bb6e4ea7c4408cfafc52d17cfc02f4c33b044312e2e31d01de4f569fa29
Public Key:  04a14c9914b369c4c54476b0bb171f3133a35e4f839d6549c346146822fa8b210cba0ed3d42b4d6ec91608470089300a129b152abbefb7a102cb88e0228b8ec109
#2
Private Key:  24e214022c5674b1f41526c820f05b7846a05e459becf855dcc8c23bcd5e2ad2
Public Key:  04b29093aafae4258a9c339ce87615993f7fc6a1c8f323826db294add4c06de542e5dc0ecfaed53b06f9edef39da0f2ef013f78f243cfeb3b673f19e2a692d1e2c
#3
Private Key:  2980fd488f105c2ac63fa2f48c5db19f3c619c64260754f3dfb57deee1dbb6ab
Public Key:  04273876a4017c1e6f47c4ef65b4b62cfec9607a1b2b2b7f8a013323debd47c67261643d8c0ace569345e2de292bf64d741d208a2cdc32cba019ee52d5476f8af0
*/
const MY_PRIVATE_KEY = "c6a57bb6e4ea7c4408cfafc52d17cfc02f4c33b044312e2e31d01de4f569fa29";
const MY_PUBLIC_KEY = "04a14c9914b369c4c54476b0bb171f3133a35e4f839d6549c346146822fa8b210cba0ed3d42b4d6ec91608470089300a129b152abbefb7a102cb88e0228b8ec109";

function hashMessage(message) {
    let b = utf8ToBytes(message);
    return keccak256(b);
}

async function signMessage(msg) {
    let hashedMsg = hashMessage(msg);
    
    let signedHash = await secp.sign(hashedMsg, MY_PRIVATE_KEY, { recovered: true });
    return signedHash;
}


// BODY:
// 1 convert the message to bytes
console.log("Creating the signature");
const msgStr = "abc";
console.log("msgStr          =" + msgStr);

const messageInBytes = utf8ToBytes(msgStr);
console.log("messageInBytes  =" + messageInBytes);

// 2 hash the message
const keccakHash = keccak256(messageInBytes);
console.log("keccakHash      =" + keccakHash);
console.log("keccakHash (hex)=" + toHex(keccakHash));

// 3 calculate a signature with the given private key
const signature= signMessage(msgStr);

/*
// lets see if ths works
console.log("Signature created...");
   var start = new Date().getTime();
   var end = start;
   while(end < start + 3000) {
     end = new Date().getTime();
  }
console.log("After waiting 1000ms");
*/

//let signature = await secp.sign(keccakHash, MY_PRIVATE_KEY, { recovered: true } );
console.log("signature       =" + signature);
//console.log("signature  (hex)=" + toHex(signature));

// 4 Recover Public Key
/* No lo estoy pudiendo recuperar asi */
/* 
const publicKeyRecovered = secp.recoverPublicKey(keccakHash, signature[0], signature[1]);
console.log("pubKRecovr      =" + publicKeyRecovered);
setTimeout(console.log("Waiting 1 sec"))
console.log("pubKRecovr (hex)=" + toHex(publicKeyRecovered));
*/

// 5 Recover using verify
//quiza no verifica porque la firma es una promesa->Promise
const verification = secp.verify(signature, keccakHash, MY_PUBLIC_KEY);
console.log("verify()        =" + verification);


}()); //end of hack, just a single line
