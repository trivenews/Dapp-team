import { 
	WEB3_CONNECTED, 
    TRIVE_CONTRACT_INSTANTIATED,
    WEB3_ACCOUNT,
	//defaultState 
} from '../actions';

const defaultState = {
  account: '',
  triveContract: ''
}

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
        account: action.payload
    };
    default:
    return state
  }
};

export default trive;