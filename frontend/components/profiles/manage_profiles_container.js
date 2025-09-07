
import { connect } from 'react-redux';
import { updateProfile, fetchProfiles, deleteProfile, createProfile } from '../../actions/profile_actions';
import ManageProfiles from './manage_profiles';

const mSTP = state => ({
    profiles: Object.values(state.entities.profiles),
    userId: state.session.id,
    editProfile: state.edit
});

const mDTP = dispatch => ({
    updateProfile: profile => dispatch(updateProfile(profile)),
    fetchProfiles: userId => dispatch(fetchProfiles(userId)),
    deleteProfile: profileId => dispatch(deleteProfile(profileId)),
    createProfile: profile => dispatch(createProfile(profile))
});

export default connect(mSTP, mDTP)(ManageProfiles);