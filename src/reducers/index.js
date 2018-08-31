import { combineReducers } from 'redux';
import trive from './web3Reducer';


const reducer = combineReducers({
    trive : trive,
})

export default reducer;