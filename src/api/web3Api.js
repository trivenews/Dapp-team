import Web3 from 'web3';

import VotingContract from '../../build/contracts/Voting.json';
import CoinContract from '../../build/contracts/TokenInterface.json';
import contract  from 'truffle-contract';


let web3Provided;

let provider;

if (typeof web3 !== 'undefined') {
    provider = new Web3(web3.currentProvider);
} else {
    provider = new Web3.providers.HttpProvider('http://localhost:7545');
}

const web3 = new Web3(provider);

const votingContract = contract(VotingContract);
votingContract.setProvider(provider);

const coinContract = contract(CoinContract);
coinContract.setProvider(provider);

/**
 * Check for a local web3,
 */
function initializeWeb3() {
if (typeof window.web3 !== undefined) {
    web3 = new Web3(window.web3.currentProvider);
  } else {
    const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545'); // this will be ganache-cli
    web3 = new Web3(provider);
  }
  return web3Provided;
}

function web3Client() {
    if (web3Provided) {
        return web3Provided;
    } else {
        return initializeWeb3();
    }
}

export function getAccounts() {
    return new Promise((resolve, reject) => {
        web3Client().eth.getAccounts(function (err, accts) {
            if (err != null) {
                console.log("Web3Api Error: ", err);
                reject();
            }

            if (accts.length === 0) {
                console.log("Web3Api Error: couldn't get any accounts");
                reject();
            }

            let accountsAndBalances = accts.map((address => {
                return getAccountBalance(address).then((balance) => { 
                    return { address, balance} 
                });
            }));

            Promise.all(accountsAndBalances).then((accountsAndBalances) => {
                resolve(accountsAndBalances);
            });

        });
    
    });
}


