import { RECEIVE_CURRENT_USER, RECEIVE_SESSION_ERRORS, RESET_SESSION_ERRORS } from "../actions/session_actions";


const sessionErrorsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_SESSION_ERRORS:
            debugger
            return action.errors;
        case RESET_SESSION_ERRORS:
            return {};
        case RECEIVE_CURRENT_USER:
            return [];
        default:
            return state;
    }
};

export default sessionErrorsReducer;