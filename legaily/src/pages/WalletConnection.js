import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
function WalletConnection({ setWalletAddress }) {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask not detected! Please install it.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const selectedAccount = accounts[0];
      setAccount(selectedAccount);
      setWalletAddress(selectedAccount); // 👈 Send it to parent
    } catch (error) {
      console.error("User rejected wallet connection");
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        const selectedAccount = accounts[0] || null;
        setAccount(selectedAccount);
        setWalletAddress(selectedAccount); // 👈 Sync on account change
      });

      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    }
  }, []);

  return (
    <div>
      {account ? (
        <p>Connected wallet: {account}</p>
      ) : (
        <button onClick={connectWallet}>Connect MetaMask Wallet</button>
      )}
    </div>
  );
}


export default WalletConnection;
