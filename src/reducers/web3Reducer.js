import { 
	WEB3_CONNECTED, 
    TRIVE_CONTRACT_INSTANTIATED,
    WEB3_ACCOUNT,
	defaultState 
} from '../actions';

const trive = (state = defaultState, action) => {
  switch (action.type) {
  case WEB3_CONNECTED:
    return {
      ...state,
      web3: action.payload
    };
  case TRIVE_CONTRACT_INSTANTIATED:
    return {
      ...state,
      triveContract: action.payload
    };
  case WEB3_ACCOUNT:
    return {
        ...state, 
        web3: { ...state.web3, account: action.address } 
    };
    default:
    return state
  }
};

export default trive;