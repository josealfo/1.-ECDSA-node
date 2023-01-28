import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [privateKey, setPrivateKey] = useState("");
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
 // const [txStatus, setTxStatus] = useState("Waiting for instruction to send funds");

  return (
    <div className="app">
      <Wallet
        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
      />
      <Transfer setBalance={setBalance} address={address} privateKey={privateKey}/>
      
    </div>
  );
}
/*
      <div>
      <h1>Status</h1>
        <label>{txStatus}</label>
      </div>
      */ 
export default App;
