import Web3 from 'web3';
import contract from 'truffle-contract';
import VotingContract from '../../build/contracts/Voting.json';
import CoinContract from '../../build/contracts/TokenInterface.json';


export const WEB3_CONNECTED = 'WEB3_CONNECTED';
export const WEB3_DISCONNECTED = 'WEB3_DISCONNECTED';
export const WEB3_ACCOUNT = 'WEB3_ACCOUNT';
export const TRIVE_CONTRACT_INSTANTIATED = 'TODOS_CONTRACT_INSTANTIATED';


export const defaultState = {
  web3:{
    account: null
  },
  trive: []
};

export function web3connect() {
  return (dispatch) => {
    const web3 = window.web3;

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.
      dispatch({
        type: WEB3_CONNECTED,
        payload: new Web3(web3.currentProvider)
      });
    } else {
      dispatch({
        type: WEB3_CONNECTED,
        payload: new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
      });
    }
  };
}

export function instantiateTriveContract() {
  return (dispatch, getState) => {
    const web3 = getState().web3;
    const trive = contract(VotingContract);
    trive.setProvider(web3.currentProvider);
    return trive.deployed().then((triveContract) => {
      dispatch({
        type: TRIVE_CONTRACT_INSTANTIATED,
        payload: triveContract
      });
    });
  };
}

export function storeWeb3Account(address) {
  return { type: WEB3_ACCOUNT, address }
}
