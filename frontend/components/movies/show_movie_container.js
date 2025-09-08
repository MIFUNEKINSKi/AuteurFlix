
import React from 'react';
import { connect } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovie } from '../../actions/movie_actions';
import ShowMovie from './show_movie';

// Functional component wrapper to use hooks directly
const ShowMovieWrapper = (props) => {
    const params = useParams();
    const navigate = useNavigate();
    
    const movieId = params.movieId;
    const currentMovie = movieId ? props.movies[movieId] : null;
    
    return (
        <ShowMovie 
            {...props}
            currentMovie={currentMovie}
            movieId={movieId}
            navigate={navigate}
        />
    );
};

const mSTP = (state) => ({
    movies: state.entities.movies || {}
});

const mDTP = dispatch => ({
    fetchMovie: movieId => dispatch(fetchMovie(movieId))
});

export default connect(mSTP, mDTP)(ShowMovieWrapper);