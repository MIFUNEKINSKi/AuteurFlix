
import { connect } from 'react-redux';
import SignupForm from './signup_form';
import { signup, resetSessionErrors } from '../../actions/session_actions';

const mSTP = (state, ownProps) => ({
    errors: Object.values(state.errors.session),
    email: ownProps.email
});

const mDTP = dispatch => ({
    signup: user => dispatch(signup(user)),
    resetSessionErrors: () => dispatch(resetSessionErrors())
});

export default connect(mSTP, mDTP)(SignupForm);