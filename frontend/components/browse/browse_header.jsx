import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

class BrowseHeaderClass extends React.Component {
    constructor(props) {
        super(props)
        const bool = props.location.pathname.startsWith('/search') ?
            true : false;
        this.state = {
            search: '',
            searching: bool
        }
        this.oSearch = this.oSearch.bind(this);
        this.finishSearch = this.finishSearch.bind(this);
        this.update = this.update.bind(this);
    }
// heroku comment 1
    handleSwitch() {
      this.props.resetProfile();
      if (this.props.location.pathname.startsWith('/search')) {
          this.props.navigate('/');
        } else {
          window.location.reload();
          } 
    }

    handleManage() {
        this.props.resetProfile();
        this.props.navigate('/manageprofiles');
    }

    update(e) {
        this.setState({ search: e.currentTarget.value });
        if (this.props.searchTitles) {
            this.props.searchTitles(e.currentTarget.value);
        }
        if (this.props.searchGenres) {
            this.props.searchGenres(e.currentTarget.value);
        }
    }

    oSearch() {
        this.props.navigate('/search');
        this.setState({searching: true});
    }


    finishSearch() {
        if (this.props.location.pathname.startsWith('/search')) {
            this.props.navigate('/browse');
        } else {
            return;
        }
    }

    render () {
        
        const search = this.state.searching ?
            null : this.oSearch;
        const filled = this.state.search === '' ? '' : 'search-filled';
        const searchImage = this.state.searching ?
            (
                <div className='search-bar'>
                    < img
                        id='search-bar-icon'
                        src={window.searchIcon}
                    />
                    <input
                        autoFocus
                        className='search-input'
                        type="text"
                        onChange={this.update}
                    />
                    <label id={filled}>Title, Keyword</label>
                    <p
                        className='exit-search'
                        onClick={this.finishSearch}
                    >X</p>
                </div>
            ) :
            ( < img
                className = 'search-icon'
                src = { window.searchIcon }
                onClick = { search }
            /> ) 
        return (
            <div className='browse-header'>
                <Link to='/' className='home-button'><img id="logo" src={window.logoURL} alt="Napflix" /></Link>
                <div className='left-nav'>
                    <Link to='/browse/'><p>Home</p></Link>
                    <Link to='/browse/my-list'><p>My List</p></Link>
                    <a href='https://github.com/MIFUNEKINSKi/AuteurFlix' target='_blank'>GitHub</a>
                    <a href='https://www.linkedin.com/in/chris-moore-27438989/' target='_blank'>LinkedIn</a>
                </div>
                <div className='right-nav'>
                    {searchImage}
                    <div className='profiles-dropdown'>
                        <div className='dropdown-btn'>
                            <img id='profiles-avatar' src={window.avatar} />
                            <p id='profiles-arrow'>Profiles</p>
                        </div>
                        <div className='profiles-dropdown-content'>
                            <p 
                                onClick={() => this.handleSwitch()}>
                                Switch Profiles
                            </p>
                            <p 
                                onClick={() => this.handleManage()}>
                                Manage Profiles
                            </p>
                            <p 
                                onClick={() => this.props.logout()}>
                                Sign Out of AuteurFlix
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
 
};

// Wrapper component to use React Router v6 hooks
const BrowseHeader = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    return <BrowseHeaderClass {...props} navigate={navigate} location={location} />;
};

export default BrowseHeader;