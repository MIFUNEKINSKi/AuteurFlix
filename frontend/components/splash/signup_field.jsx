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
        debugger

        // regex test 
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
                <section className='hero-text'>
                    <h1>Curated list of movies from Auteur directors and their eras!</h1>
                    <h2>Auteur - a filmmaker whose personal influence and artistic control over a movie are so great that the filmmaker is regarded as the author of the movie.</h2>
                    <h3>Ready to watch? Enter your email to so we can get to the payment.</h3>

                </section>

                <form className='signup-field-form' onSubmit={this.handleSubmit}>
                    <div className='input-container'>
                        <input
                            className='email'
                            type="email"
                            onChange={this.update('email')}
                            placeholder={this.state.email === '' ? 'Email address' : ''}
                        />
                        {this.state.email !== '' && <label id="filled">Email address</label>}
                    </div>
                    <button className='signup-btn' type='submit'>Get Started</button>
                </form>
                <div className='splash-errors'>{this.state.error}</div>
            </div>

        )
    }
}

export default SignupField;