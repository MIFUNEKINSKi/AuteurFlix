import React from 'react';

class BottomSignupField extends React.Component {
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
            <div className='btm-signup-container'>
                <section className='signup-text'>
                    {/* <h3>Ready to watch? Enter your email to so we can get to the payment.</h3> */}
                </section>
                
                <form className='signup-bar-form' onSubmit={this.handleSubmit}>
                    <div className='input-container'>
                        <input
                            className='email'
                            type="email"
                            onChange={this.update('email')}
                        />
                        <label id={filled}>Email address</label>
                        <button className='sign-btn' type='submit'>Get Started</button>
                    </div>
                </form>
                <div className='splash-error'>{this.state.error}</div>
            </div>

        )
    }
}

export default BottomSignupField;