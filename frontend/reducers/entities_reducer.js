import { combineReducers } from "redux";
import usersReducer from "./users_reducer";
import profilesReducer from './profiles_reducer';


export default combineReducers({
    users: usersReducer,
    profiles: profilesReducer,
});
