import React from 'react';

class SignupField extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            error: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    update(field) {
        return e => this.setState({ [field]: e.currentTarget.value });
    };

    handleClick(e) {
        e => this.setState({ [email]: '' });

    }


    handleSubmit(e) {
        e.preventDefault();
        const email = this.state.email;
        const valid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (valid.test(email)) {
            this.props.history.push({ pathname: `/signup`, email: email });
        } else {
            this.setState({ error: 'Please enter a valid email.' });
        }
    }

    render() {
        const filled = this.state.email === '' ? '' : 'filled';
        return (
            <div className='signup-container'>
                <section className='signup-text'>
                    <h2>Limited movies from a distinct set of directors and era.</h2>
                    <p>Watch only on approved browsers (not Safari)</p>
                    <p>Ready to watch? Enter your email to so we can get to the payment.</p>

                </section>

                <form className='signup-bar-form' onSubmit={this.handleSubmit}>
                    <div className='input-container'>
                        <input
                            className='email-input'
                            type="email"
                            onChange={this.update('email')}
                        />
                        <label id={filled}>Email address</label>
                    </div>


                    <button className='signup-bar-btn' type='submit'>Get Started</button>

                </form>
                <p className='splash-error'>{this.state.error}</p>
            </div>

        )
    }
}

export default SignupField;