import React from "react";
import { Link } from "react-router-dom";

class DetailsModal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            sound: this.props.sound
        }
        this.modalAutoplay = this.modalAutoplay.bind(this);
        this.toggleListItem = this.toggleListItem.bind(this);
        this.soundOff = this.soundOff.bind(this);
        this.clearT = this.clearT.bind(this);
       
    }

    componentDidMount() {
        // Start video when modal loads
        setTimeout(() => {
            const video = document.getElementById('modal-vid');
            if (video) {
                console.log('Starting modal video on mount');
                video.play().catch(err => {
                    console.log('Modal video autoplay failed:', err);
                });
            }
        }, 100);
    }

    modalAutoplay(e) {
        this.clearT();
        const video = e.currentTarget.querySelector('#modal-vid');
        const soundButton = e.currentTarget.querySelector('.modal-sound-off');
        
        if (!video) {
            console.log('Modal video not found');
            return;
        }
        
        console.log('Modal autoplay triggered:', video);
        video.classList.remove('idle');
        if (soundButton) soundButton.classList.remove('invisible');
        video.muted = !this.state.sound;
        video.play().catch(err => {
            console.log('Modal video play error:', err);
        });
    }

    clearT() {
        let id = window.setTimeout(() => { }, 0);
        while (id--) {
            window.clearTimeout(id);
        }
    }
    soundOff(e) {
        const bool = this.state.sound ? false : true;
        this.setState({ sound: bool });
        
        const modal = e.currentTarget.closest('.modal');
        const video = modal?.querySelector('#modal-vid');
        
        if (video) {
            video.muted = !bool;
        }
    }
    convertLength(minutes) {
        const h = parseInt(minutes / 60);
        const m = minutes % 60;
        return `${h}h ${m}m`;
    }
    toggleListItem() {
        console.log('Toggle list item clicked', this.props.movie.id, this.props.myList);
        if (this.onList()) {
            const item = this.props.myList.filter(listItem =>
                listItem.movie_id === this.props.movie.id
            );
            console.log('Removing from list:', item[0]);
            return this.props.deleteListItem(item[0].id);
        } else {
            console.log('Adding to list:', this.props.movie.id, this.props.currentProfileId);
            return this.props.createListItem(this.props.movie.id, this.props.currentProfileId);
        }
    }
    onEnd(e) {
        e.currentTarget.classList.add('hide');
        e.currentTarget.parentElement.previousElementSibling.classList.remove('hide');
    }
    onList() {
        const match = this.props.myList.filter(listItem => listItem.movie_id === this.props.movie.id);
        return match.length > 0;
    }
    render() {
        const displayLength = this.convertLength(this.props.movie.length);
        const listButton = this.onList() ? '✓' : '+';
        const soundBtn = this.state.sound ? window.volumeOff : window.volumeOn;
        return (
        <>
            <div className='modal-backdrop' onClick={this.props.toggleModal}></div>
            <div className='modal'>
                <button onClick={this.props.toggleModal} className='exit-modal'>X</button>
                <img className='modal-thumbnail hide' src={this.props.movie.photoUrl} alt="" />
                <div className='modal-vid-container'>
                    <p className='modal-title'>{this.props.movie.title}</p>
                    <div className='modal-btns'>
                        <Link to={`/watch/${this.props.movie.id}`} className='modal-play'>&#9658; Play</Link>
                        <button 
                            id='modal-add-list'
                            onClick={() => {
                                console.log('Modal button clicked!');
                                this.toggleListItem();
                            }}
                            >{listButton}</button>
                    </div>
                <video
                    id='modal-vid'
                    src={this.props.movie.videoUrl}
                    muted={true}
                    preload="metadata"
                    autoPlay={true}
                    onEnded={this.onEnd}
                    onLoadedData={() => {
                        console.log('Modal video loaded');
                    }}
                    onError={(e) => {
                        console.log('Modal video error:', e);
                    }}
                ></video>
                <img src={soundBtn}
                    className='modal-sound-off'
                    onClick={this.soundOff} />
            </div>
            <div className='modal-details'>
                <div className='left-details'>
                    <div>
                        <p>{this.props.movie.year}</p>
                        <p className='modal-director'>{this.props.movie.director}</p>
                        <p>{displayLength}</p>
                    </div>
                    <p>{this.props.movie.summary}</p>
                </div>
            </div>
        </div>
        </>
        )
    
    }
}

export default DetailsModal;
    
