import { RECEIVE_ALL_MOVIES, RECEIVE_MOVIE } from "../actions/movie_actions";
import { LOGOUT_CURRENT_USER } from "../actions/session_actions";

const moviesReducer = (state = {}, action) => {
    Object.freeze(state)
    
    switch (action.type) {
        case RECEIVE_ALL_MOVIES:
            return action.movies.movies;
        case RECEIVE_MOVIE:
            return Object.assign({}, state, { [action.movie.movie.id]: action.movie.movie });
        case LOGOUT_CURRENT_USER:
            return {};
        default:
            return state;
    }
    // reducer
}

export default moviesReducer;
