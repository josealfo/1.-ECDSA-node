const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require('ethereum-cryptography/keccak');
const { utf8ToBytes } = require('ethereum-cryptography/utils');
const { toHex } = require('ethereum-cryptography/utils');

app.use(cors());
app.use(express.json());

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
const balances = {
  "04a14c9914b369c4c54476b0bb171f3133a35e4f839d6549c346146822fa8b210cba0ed3d42b4d6ec91608470089300a129b152abbefb7a102cb88e0228b8ec109": 100,
  "04b29093aafae4258a9c339ce87615993f7fc6a1c8f323826db294add4c06de542e5dc0ecfaed53b06f9edef39da0f2ef013f78f243cfeb3b673f19e2a692d1e2c": 50,
  "04273876a4017c1e6f47c4ef65b4b62cfec9607a1b2b2b7f8a013323debd47c67261643d8c0ace569345e2de292bf64d741d208a2cdc32cba019ee52d5476f8af0": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

/* 
    Get a signature from the client-side app,
     recove the public address from the signature
     and that is going to be the sender
     if the signature is not right, reject the transaction 
*/
app.post("/send", (req, res) => {
  const { sender, recipient, amount, msgStr, signature } = req.body;
  //console.log("req.body=",req.body);

  setInitialBalance(sender);
  setInitialBalance(recipient);

  const messageInBytes = utf8ToBytes(msgStr);
  const keccakHash = keccak256(messageInBytes);    
  
  // Convert the signature to Uint8Array (needed after sending, thanks shyanukant!)
  const formattedSignature = Uint8Array.from(Object.values(signature[0]));
 
  // Now reconstructing the public Key in the server... 
  const publicKeyRecovered = secp.recoverPublicKey(keccakHash, formattedSignature, signature[1]);
  
  // Verify  
  const verification = secp.verify(formattedSignature, keccakHash, publicKeyRecovered);

  //debugging purposes
  //console.log("timestamp=", Date.now().toString().slice(-3));
  //console.log("sender=", sender);
  
  if (!verification) {
    res.status(400).send({ message: "Not verified!" });
  }
  else if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender], message: "Transfer succesful" });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
