import { useState } from "react";
import server from "./server";

// Cryptography imports
import { keccak256 } from 'ethereum-cryptography/keccak';
import { utf8ToBytes } from 'ethereum-cryptography/utils';
import { toHex } from 'ethereum-cryptography/utils';

import * as secp from '@noble/secp256k1';

function Transfer({ address, setBalance, privateKey}) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  
  const setValue = (setter) => (evt) => setter(evt.target.value);

  /* Transfer async function
    Here we will generate a signature
        with the recipient
      and send it to the server 
      (sending the signature, not the private key) */
  async function transfer(evt) {
    evt.preventDefault();
    
    /* Debggin purposes */
    // Create a signature (with the given private key), in 3 steps
    // 1 convert the message to bytes
    console.log("Creating the signature");
    const msgStr = recipient;
    const messageInBytes = utf8ToBytes(msgStr);
    console.log("messageInBytes=" + messageInBytes);
 
    // 2 hash the message
    const keccakHash = keccak256(messageInBytes);
    console.log("keccakHash=" + keccakHash);

    // 3 calculate a signature with the given private key
    let signature = await secp.sign(keccakHash, privateKey, { recovered: true } );
    console.log("signature=" + signature);

    // Construct a public key (debugging purposes)
    const publicKeyRecovered = secp.recoverPublicKey(keccakHash, signature[0], signature[1]);
    console.log("publicKeyRecovered=" + toHex(publicKeyRecovered));
    
    /** verify here, is simpler */
    /* Verify it here in the fontend */
    const verification  = secp.verify(signature[0], keccakHash, address);
    const verification2 = secp.verify(signature[0], keccakHash, publicKeyRecovered); //without toHex()
    //const verification = secp.verify(formattedSignature, keccakHex, publicKeyRecovered);
    console.log("verification=", verification);
    console.log("verification2=", verification2);
    

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,     
        msgStr,  /* send msg (in a string) and signature, both needed to verify */
        signature,            
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>


      <input type="submit" className="button" value="Transfer" />
    </form>
  );

  /*

      <label>
        Private Key for signing
        <input
          placeholder="This shouldn't be asked this way"
          value={privKey}
          onChange={setValue(setPrivKey)}
        ></input>
      </label>
  */
}

export default Transfer;
