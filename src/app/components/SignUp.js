import React from 'react';
import Popup from './tools/Popup.js';
import { Link, withRouter, } from 'react-router-dom';
import * as routes from './tools/routes';
import { auth } from './firebase';

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null
}

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
})

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...INITIAL_STATE
        };
    }
    onSubmit = (event) => {
        const {
            username,
            email,
            passwordOne,
        } = this.state;

        const {
            history,
        } = this.props;

        auth.doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                this.setState(() => ({ ...INITIAL_STATE }));
                history.push(routes.SIGN_IN);
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });

        event.preventDefault();    
    }
    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid = passwordOne !== passwordTwo || passwordOne === '' || email === '' || username === '';

        return (
            <Popup>
                <h1> Sign Up </h1>
                <form onSubmit={this.onSubmit}>
                    <input 
                    type="text" 
                    placeholder="Username"
                    value={username}
                    onChange={event => this.setState(byPropKey('username', event.target.value))}
                    />

                    <input 
                    type="email" 
                    placeholder="Email"
                    value={email}
                    onChange={event => this.setState(byPropKey('email', event.target.value))}
                    />

                    <input 
                    type="password" 
                    placeholder="Password"
                    value={passwordOne}
                    onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                    />

                    <input 
                    type="password" 
                    placeholder="Password"
                    value={passwordTwo}
                    onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                    />

                    { error && <p>{error.message}</p> }

                    <button disabled={isInvalid} type="submit" className="btn btn--primary">Create an account</button>
                    <Link className="btn btn--primary" to={routes.SIGN_IN}>I have an account</Link>
                </form>
            </Popup>
        )
    }
}

export default withRouter(SignUp);