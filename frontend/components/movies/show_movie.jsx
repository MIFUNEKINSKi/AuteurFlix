import React from "react";

class ShowMovie extends React.Component {
    constructor(props) {
        super(props)
        this.goBack = this.goBack.bind(this);
        this.showControls = this.showControls.bind(this);
        this.unmute = this.unmute.bind(this);
    }

    componentDidMount() {
        // Fetch movie if it's not already loaded
        if (!this.props.currentMovie && this.props.movieId) {
            this.props.fetchMovie(this.props.movieId);
        }
    }

    componentDidUpdate(prevProps) {
        // If we still don't have the movie after the fetch attempt, 
        // and the movieId has changed, try fetching again
        if (!this.props.currentMovie && this.props.movieId && 
            prevProps.movieId !== this.props.movieId) {
            this.props.fetchMovie(this.props.movieId);
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
        // Add safety check for currentMovie
        if (!this.props.currentMovie) {
            return <div style={{color: 'white', fontSize: '24px', textAlign: 'center', marginTop: '50px'}}>Loading...</div>;
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