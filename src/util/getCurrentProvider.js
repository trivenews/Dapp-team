import Web3 from 'web3'

export default function getCurrentProvider(web3) {
    if (typeof window.web3 !== undefined) {
        web3 = new Web3(window.web3.currentProvider);
      } else {
        const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545'); // this will be ganache-cli
        web3 = new Web3(provider);
      }

}