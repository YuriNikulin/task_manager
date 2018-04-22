import React from 'react';
import Popup from './tools/Popup.js';
import { Link, withRouter, } from 'react-router-dom';
import * as routes from './tools/routes';
import { auth } from './firebase';
import { db } from './firebase/firebase.js';

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
                const uid = authUser.uid;
                history.push(routes.SIGN_IN);
                db.ref('users/' + authUser.uid + '/').set({
                    info: {email, username, uid},
                    tasks: {}
                });
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
                <h2 className="tm__title tm-popup__title"> Sign Up </h2>
                <form onSubmit={this.onSubmit}>
                    <div className="tm-input-container">
                        <input 
                        type="text" 
                        placeholder="Username"
                        className="tm-input"
                        value={username}
                        onChange={event => this.setState(byPropKey('username', event.target.value))}
                        />
                    </div>

                    <div className="tm-input-container">
                        <input 
                        type="email" 
                        placeholder="Email"
                        className="tm-input"
                        value={email}
                        onChange={event => this.setState(byPropKey('email', event.target.value))}
                        />
                    </div>

                    <div className="tm-input-container">
                        <input 
                        type="password" 
                        placeholder="Password"
                        className="tm-input"
                        value={passwordOne}
                        onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                        />
                    </div>

                    <div className="tm-input-container">
                        <input 
                        type="password" 
                        placeholder="Repeat Password"
                        className="tm-input"
                        value={passwordTwo}
                        onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                        />
                    </div>

                    { error && <p>{error.message}</p> }

                    <button disabled={isInvalid} type="submit" className={"tm-btn tm-btn--primary mr " + (isInvalid ? 'tm-btn--disabled' : null)}>Create an account</button>
                    <Link className="tm-btn tm-btn--text" to={routes.SIGN_IN}>I have an account</Link>
                </form>
            </Popup>
        )
    }
}

export default withRouter(SignUp);