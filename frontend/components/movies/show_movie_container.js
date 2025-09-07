
import React from 'react';
import { connect } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovies } from '../../actions/movie_actions';
import ShowMovie from './show_movie';

const ShowMovieWrapper = () => {
    const { movieId } = useParams();
    const navigate = useNavigate();
    
    const mSTP = (state) => {
        return {
            currentMovie: state.entities.movies[movieId],
            movieId: movieId
        };
    };

    const mDTP = dispatch => ({
        fetchMovies: () => dispatch(fetchMovies())
    });

    const ConnectedShowMovie = connect(mSTP, mDTP)(ShowMovie);
    
    return <ConnectedShowMovie navigate={navigate} />;
};

export default ShowMovieWrapper;