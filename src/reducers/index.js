import { combineReducers } from 'redux';
import trive from './web3Reducer';
import currentUserInfo from './user';


const reducer = combineReducers({
    trive : trive,
    currentUserInfo: currentUserInfo
})

export default reducer;