import Web3 from 'web3';
import contract from 'truffle-contract';
import VotingContract from '../../build/contracts/Voting.json';
import CoinContract from '../../build/contracts/TokenInterface.json';
import Web3File from '../web3';

export const WEB3_CONNECTED = 'WEB3_CONNECTED';
export const WEB3_DISCONNECTED = 'WEB3_DISCONNECTED';
export const WEB3_ACCOUNT = 'WEB3_ACCOUNT';
export const TRIVE_CONTRACT_INSTANTIATED = 'TRIVE_CONTRACT_INSTANTIATED';

//user
export const CURRENT_USER_INFO  = 'CURRENT_USER_INFO ';

// export const defaultState = {
//   account: null
// };
  

//this works
export function instantiateTriveContract() {
  return (dispatch, getState) => {
    
    // let trive = getState().triveContract
    const trive = contract(VotingContract);
    trive.setProvider(Web3File.currentProvider);
    return trive.deployed().then((triveContract) => {
      dispatch({
        type: TRIVE_CONTRACT_INSTANTIATED,
        payload: triveContract
      });
      console.log('inside',triveContract)
      triveContract = getState().triveContract
      
    });
    console.log('outside',this.triveContract)
  };
}

//this works
export function storeWeb3Account() {
  return async (dispatch, getState) => {
  let account = getState().account;
  const accounts= await Web3File.eth.getAccounts();
  account = accounts[0]
  console.log('my account', account, 'my accounts',accounts)
 { dispatch({type: WEB3_ACCOUNT, payload: account })
}
  }
}

export async function grepEthAccount (profileParams){
  const {curUserInfo} = profileParams;
  return(dispatch, getState) => {
    const state = getState();
    const triveContract = state.triveContract
    const account = state.account
    if(!account) {
      window.alert('Hey there looks like metamask is not currently active')
    }
    triveContract.findUserInfo.call(
      curUserInfo,
      {from: account})

  }
  // const accounts = await web3.eth.getAccounts();
  // // this.setState({noUserAddr: accounts[0]})
  // // check if the account is a user
  // this.props.trive.findUserInfo.call(
  //   curUserInfo,
  //   {from: accounts[0]})
  // .then((result) => {

  //   // TODO: I need to route from here
  //   // return TriveDappInstance.findUserInfo.call(account)
  // }).then(() => {
  //   this.checkbalance();
  //   this.checkIfUserIsResearcher();
  // }).then(() => {

  // })
  // .catch((error) => {
  //   console.log(error);
  //   this.setState({noUserAddr: accounts[0]})
  // })
};

// export function currentUserInformation() {
//   return async (dispatch, getState) => {
//     let account = getState().account;
//   const accounts= await Web3File.eth.getAccounts();
//   account = accounts[0]
//   const trive = contract(VotingContract);
//     console.log('current user information', trive)
//     // const curUserInfo = getState().curUserInfo;
//     trive.findUserInfo.call({from: accounts[0]})
   
//     console.log(trive.findUserInfo.call({from: account}), 'result from call')

    //   this.setState({
    //     curUserInfo : {
    //       isUser: true,
    //       name: result[0],
    //       address: account[0],
    //       reputation: result[1].toString(),
    //       readyTime: result[2].toString(),
    //       rank: result[3].toString()
    //     }  
    //   })
    // )
    // .then(() => {
		// 	dispatch({
		// 		type: CURRENT_USER_INFO,
		// 		payload: curUserInfo
		// 	})
		// })
    // ).then(() => {
    //   	dispatch({
    //   		type: CURRENT_USER_INFO,
    //   		payload: curUserInfo
    //   	})
    //   })
    
//     }


// }

