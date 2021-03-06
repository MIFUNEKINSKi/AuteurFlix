import * as SessionApiUtil from '../util/session_api_util';
export const RESET_SESSION_ERRORS = 'RESET_SESSION_ERRORS';
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';

export const resetSessionErrors = () => ({
    type: RESET_SESSION_ERRORS,
});

const receiveCurrentUser = currentUser => {
    debugger
    return {
    type: RECEIVE_CURRENT_USER,
    currentUser
    };
};


const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER
});

const receiveSessionErrors = errors => {
    debugger 
    return {
    type: RECEIVE_SESSION_ERRORS,
    errors
    }
};

export const login = user => dispatch =>
    SessionApiUtil.login(user)
        .then(user => dispatch(receiveCurrentUser(user)),
            errors => dispatch(receiveSessionErrors(errors.responseJSON)));

export const logout = () => dispatch =>
    SessionApiUtil.logout()
        .then(() => dispatch(logoutCurrentUser()),
            errors => dispatch(receiveSessionErrors(errors.responseJSON)));

export const signup = user => dispatch => {
    return SessionApiUtil.signup(user)
    .then(user => dispatch(receiveCurrentUser(user)),
    errors => dispatch(receiveSessionErrors(errors.responseJSON)));
    debugger
}