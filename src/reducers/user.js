import { 
	CURRENT_USER_INFO 
} from '../actions';

const defaultState = {
    curUserInfo: {
        isUser: false,
        name: "",
        address: "",
        reputation: "",
        readyTime: "",
        rank: ""
      }
}


const currentUserInfo = (state = defaultState, action) => {
    switch(action.type){
    case CURRENT_USER_INFO: 
        return {
        ...state,
        curUserInfo: action.payload
        };
        default:
        return state
    }
}

export default currentUserInfo;