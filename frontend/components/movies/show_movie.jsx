import React from "react";

class ShowMovie extends React.Component {
    constructor(props) {
        super(props)
        this.goBack = this.goBack.bind(this);
        this.showControls = this.showControls.bind(this);
        this.unmute = this.unmute.bind(this);
    }

    componentDidMount() {
        // Fetch movies if current movie is not available
        if (!this.props.currentMovie) {
            this.props.fetchMovies();
        }
    }

    componentDidUpdate(prevProps) {
        // Auto-fetch movies if we navigate to a new movie that isn't loaded
        if (prevProps.movieId !== this.props.movieId && !this.props.currentMovie) {
            this.props.fetchMovies();
        }
    }

    showControls() {
        this.clearTimers();
        const arrow = document.getElementById('back-arrow');
        arrow.classList.remove('hidden');
        setTimeout(() => arrow.classList.add('hidden'), 3000);
    }

    clearTimers() {
        let id = window.setTimeout(() => { }, 0);

        while (id--) {
            window.clearTimeout(id);
           
        }
    }

    unmute(e) {
        e.currentTarget.muted = false;
    }

    goBack() {
        this.props.navigate('/browse');
    }

    render() {
        // Add error handling for missing movie
        if (!this.props.currentMovie) {
            return (
                <div className='movie-container'>
                    <div>Loading movie...</div>
                </div>
            );
        }
    
        return(
            <div 
                className='movie-container'
                onMouseMove={this.showControls}
                >
                <div id='back-arrow' 
                    className='hidden'
                    onClick={this.goBack}
                    >
                    <span className='arrow-icon'>←</span>
                    <span className='back-text'>Back</span>
                </div>
                <video
                    autoPlay
                    muted
                    className='show-movie'
                    src={this.props.currentMovie.videoUrl}
                    controls width='1000'></video>
            </div>
            
        )
    }
}

export default ShowMovie;