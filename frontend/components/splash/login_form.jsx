import React from "react";
import { Link } from "react-router-dom";
import SignupFooter from "./signup_footer";


class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDemo = this.handleDemo.bind(this);
        props.resetSessionErrors();
    }

    handleDemo(e) {
        e.preventDefault();
        const demoUser = {
            email: 'dan@gmail.com',
            password: 'password'
        };
        this.props.login(demoUser);
    }

    handleInput(type) {
        return (e) => {
            this.setState({ [type]: e.target.value });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.resetSessionErrors();
        debugger
        this.props.login(this.state);
    }

    render() {
        const filled = this.state.email === '' ? '' : 'filled';
        const passFilled = this.state.password === '' ? '' : 'filled';
        const errors = this.props.errors && this.props.errors.length > 0 
            ? this.props.errors.map((error, index) => <li key={index}>{error}</li>) 
            : [];

        return (
            <div>


                <div className='login-main'>
                    <header className='login-header'>
                        <Link to='./' className='home-button'><img id="logo" src={window.logoURL} alt="Napflix" /></Link>
                    </header>
                    <div className='login-container'>
                        <h2>Sign In</h2>

                        <form className='form-content'>
                            <div className='login-input-container'>
                                <input
                                    className='login-input'
                                    type="text"

                                    onChange={this.handleInput('email')}
                                />
                                <label id={filled}>Email address</label>

                            </div>

                            <div className='login-input-container'>
                                <input
                                    className='login-input'
                                    type="password"
                                    onChange={this.handleInput('password')}
                                />
                                <label id={passFilled}>Password</label>
                            </div>

                            {errors.length > 0 && <ul className='error-list'>{errors}</ul>}

                            <button className='login-btn' onClick={this.handleSubmit}>Sign In</button>
                            <button className='login-btn' onClick={this.handleDemo}>Sign In as Demo User</button>
                        </form>

                        <span>New to AuteurFlix? <Link to={`/signup`} className='link-text'>Sign up now.</Link></span>

                    </div>




                </div>
                <SignupFooter />
            </div>
        );
    }

}

export default LoginForm;