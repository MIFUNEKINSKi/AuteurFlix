import React from "react";
import ProfilesIndex from "../profiles/profiles_index";
import GenresIndexContainer from "./genres_index_container";

class Browse extends React.Component {
    constructor(props) {
        debugger
        super(props)
        const bool = this.props.currentProfile ? false : true;
        debugger
        this.state = {
            showProfiles: bool
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.setState({ showProfiles: false });
        this.props.switchProfile(e.currentTarget.id);
    }

    componentDidMount() {
        // this.props.fetchMovies();
    }

    render() {
        debugger

        const display = this.state.showProfiles ?
        <ProfilesIndex
        // fetchMovies={this.props.fetchMovies}
        show={this.state.show}
        profiles={this.props.profiles}
        userId={this.props.currentUserId}
        fetchProfiles={this.props.fetchProfiles}
        handleClick={this.handleClick}
        createProfile={this.props.createProfile}
        />

        :
        <div>
                {/* <p>
                    something else goes here
                </p> */}
                <GenresIndexContainer history={this.props.history} />

            </div>



        return (
            display
        )
    }
}

export default Browse;

