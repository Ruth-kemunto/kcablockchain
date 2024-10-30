import logo from './logo.svg';
import React, { useState } from 'react';
import Web3 from 'web3';
import './App.css';

const ADDRESS = "0xf4dd5D5E7f073C7247023a5Ba2AE91FB37aae908"; // Contract address
const ABI = [
  { inputs: [{ internalType: "uint256", name: "startingpoint", type: "uint256" }, { internalType: "string", name: "startingmessage", type: "string" }], stateMutability: "nonpayable", type: "constructor" },
  { inputs: [], name: "getNumber", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "increaseNumber", outputs: [], stateMutability: "nonpayable", type: "function" },
  { inputs: [], name: "decreaseNumber", outputs: [], stateMutability: "nonpayable", type: "function" },
  { inputs: [{ internalType: "string", name: "newMessage", type: "string" }], name: "setMessage", outputs: [], stateMutability: "nonpayable", type: "function" },
  { inputs: [], name: "message", outputs: [{ internalType: "string", name: "", type: "string" }], stateMutability: "view", type: "function" }
];

function App() {
  const [number, setNumber] = useState("none");
  const [message, setMessage] = useState("none");
  const [inputMessage, setInputMessage] = useState("");

  // Initialize the web3 object with injected provider
  const web3 = new Web3(window.ethereum);

  // Initialize the contract ABI + ADDRESS
  const myContract = new web3.eth.Contract(ABI, ADDRESS);

  // Function to get the current number
  async function getNumber() {
    const result = await myContract.methods.getNumber().call();
    setNumber(result.toString());
  }

  // Function to get the current message
  async function getMessage() {
    const result = await myContract.methods.message().call();
    setMessage(result);
  }

  // Function to increase the number
  async function increaseNumber() {
    const accounts = await web3.eth.requestAccounts();
    const txReceipt = await myContract.methods.increaseNumber().send({ from: accounts[0] });
    console.log(txReceipt);
    getNumber();
  }

  // Function to decrease the number
  async function decreaseNumber() {
    const accounts = await web3.eth.requestAccounts();
    const txReceipt = await myContract.methods.decreaseNumber().send({ from: accounts[0] });
    console.log(txReceipt);
    getNumber();
  }

  // Function to update the message
  async function updateMessage() {
    const accounts = await web3.eth.requestAccounts();
    const txReceipt = await myContract.methods.setMessage(inputMessage).send({ from: accounts[0] });
    console.log(txReceipt);
    getMessage();
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <button onClick={getNumber}>Get Current Number</button>
        <br /><br />
        
        <button onClick={increaseNumber}>Increase Number</button>
        <br /><br />
        
        <button onClick={decreaseNumber}>Decrease Number</button>
        <br /><br />
        
        <button onClick={getMessage}>Get Message</button>
        <br /><br />
        
        <input
          type="text"
          placeholder="Enter new message"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <br /><br />
        
        <button onClick={updateMessage}>Update Message</button>
        <br /><br />
        
        <p>Current Number: {number}</p>
        <br />
        
        <p>Current Message: {message}</p>
      </header>
    </div>
  );
}

export default App;