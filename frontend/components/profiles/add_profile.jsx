import React from "react";
import { createProfile} from '../../actions/profile_actions';
import { Link } from "react-router-dom";


class AddProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: this.props.userId,
            name: '',
            error: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    update(field) {
       return e => this.setState({ [field]: e.currentTarget.value });
    }
    handleSubmit(e){
        e.preventDefault();
        console.log('Form submitted!', this.state); // Debug log
        if (this.state.name.length === 0) {
            this.setState({error: "Name can't be blank."});
        } else {
            const profile = Object.assign({}, 
                {user_id: this.state.user_id,
                name: this.state.name
                });
            console.log('Creating profile:', profile); // Debug log
            console.log('createProfile function:', this.props.createProfile); // Debug log
            this.props.createProfile(profile).then(() => {
                console.log('Profile created successfully!'); // Debug log
                this.props.handleCancel();
            }).catch(error => {
                console.error('Error creating profile:', error); // Debug log
                // Handle validation errors
                if (error.responseJSON && error.responseJSON.length > 0) {
                    this.setState({error: error.responseJSON[0]});
                } else {
                    this.setState({error: "Something went wrong. Please try again."});
                }
            });
        } 
    }
    render () {
        const filled = this.state.name === '' ? '' : 'profile-filled';
        return (
            <div className='add-profile-main'>
                <header>
                    <Link to='/' className='home-button'><img id="logo" src={window.logoURL} alt="Napflix" /></Link>
                </header>
                <div className='add-profile-content'>
                    <div className='add-profile-text'>
                        <h1>Add Profile</h1>
                        <p>Add a profile for another person watching AuteurFlix.</p>
                    </div>
                    <div className='add-profile-middle'>
                        <img src={window.avatar} />
                        <div className='add-profile-input-container'>
                            <input
                                className='profile-name-input'
                                type="text"
                                onChange={this.update('name')}
                            />
                            <label id={filled}>Name</label>
                        </div>
                    </div>
                    <form className='add-profile-bottom' onSubmit={this.handleSubmit}>
                        <p className='profile-error'>{this.state.error}</p>
                        <div className='add-profile-btns'>
                            <button type='submit' className='save-btn'>Continue</button>
                            <button onClick={this.props.handleCancel} className='cancel-btn'>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddProfile;