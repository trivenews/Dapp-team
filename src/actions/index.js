import Web3 from 'web3';
import contract from 'truffle-contract';
import VotingContract from '../../build/contracts/Voting.json';
import CoinContract from '../../build/contracts/TriveCoin.json';
import Web3File from '../web3';

export const WEB3_CONNECTED = 'WEB3_CONNECTED';
export const WEB3_DISCONNECTED = 'WEB3_DISCONNECTED';
export const WEB3_ACCOUNT = 'WEB3_ACCOUNT';
export const TRIVE_CONTRACT_INSTANTIATED = 'TRIVE_CONTRACT_INSTANTIATED';

//user
export const CURRENT_USER_INFO  = 'CURRENT_USER_INFO ';

//this works
export function instantiateTriveContract() {

  return async (dispatch, getState) => {
    // TriveDappCOntracts part
    const trive = contract(VotingContract);
    trive.setProvider(Web3File.currentProvider);
    let triveContract = await trive.deployed().then((trivecontract) => { return trivecontract })

    // TriveCoinContract part
    const TriveCoin = contract(CoinContract);
    TriveCoin.setProvider(Web3File.currentProvider);
    let coinContract = await TriveCoin.deployed().then((trivecontract) => { return trivecontract })

    // dispatch
    dispatch({
      type: TRIVE_CONTRACT_INSTANTIATED,
      payload: {
        isloaded: true,
        triveContract: triveContract,
    		coinContract: coinContract
      }
    });
  };

}

//this works
export function storeWeb3Account() {
  return async (dispatch, getState) => {
  // let account = getState().account;
  const accounts = await Web3File.eth.getAccounts();
  // account = accounts[0]
  console.log('my accounts',accounts)
  dispatch({type: WEB3_ACCOUNT, payload: accounts[0] })
  }
}

//this works
export function currentUserInformation() {
  return async (dispatch, getState) => {
    // let account = getState().account;
    const accounts= await Web3File.eth.getAccounts();
    let account = accounts[0]
    const trive = contract(VotingContract);
    trive.setProvider(Web3File.currentProvider);
    return trive.deployed().then((triveContract) => {
      triveContract.findUserInfo({from: account})
      .then((res) => {
        console.log(res, "this is the userinfo")
        const curUserInfo = {
            isUser: true,
            name: res[0],
            address: account,
            reputation: res[1].toString(),
            readyTime: res[2].toString(),
            rank: res[3].toString()
        };
        console.log(curUserInfo)
        dispatch({
  				type: CURRENT_USER_INFO,
  				payload: curUserInfo
  			})
      })
      .catch((error) => {
        console.log(error);
      })
    })
  };
}
