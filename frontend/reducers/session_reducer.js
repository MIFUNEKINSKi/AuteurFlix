
import { LOGOUT_CURRENT_USER, RECEIVE_CURRENT_USER } from "../actions/session_actions";


const _nullSession = {
    id: null,
    profileId: null
};


const sessionReducer = (state = _nullSession, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state)
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            nextState['id'] = action.currentUser.id;
            return nextState;
        case LOGOUT_CURRENT_USER:
            return _nullSession;
        default:
            return state;
    }
};
export default sessionReducer;