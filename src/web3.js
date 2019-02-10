import Web3 from 'web3';
var web3;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  async function requestAccess() {
    web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  }

  requestAccess();
} else if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // We are in the browser and metamask is running.

  web3 = new Web3(window.web3.currentProvider);
} else {
  // User is not running metamask
  alert("Please Install MetaMask from metamask.io");
  const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545'); // this will be ganache-cli
  web3 = new Web3(provider);
}

export default web3;
