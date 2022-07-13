
import { connect } from 'react-redux';
import Browse from './browse';
import { fetchProfiles, fetchCurrentProfile, createProfile } from '../../actions/profile_actions';


const mDTP = dispatch => ({
    fetchProfiles: userId => dispatch(fetchProfiles(userId)),
    switchProfile: profileId => dispatch(fetchCurrentProfile(profileId)),
    createProfile: profile => dispatch(createProfile(profile))
});
// debugger
// debugger
const mSTP = state => ({
    currentUserId: state.session.id,
    profiles: Object.values(state.entities.profiles),
    currentProfile: state.session.profileId
});

export default connect(mSTP, mDTP)(Browse);