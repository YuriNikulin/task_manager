import React from 'react';
import Popup from './tools/Popup.js';
import { Link, withRouter, } from 'react-router-dom';
import * as routes from './tools/routes';
import { auth, firebase } from './firebase';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...INITIAL_STATE
        };
    }

    onSubmit = (event) => {
        const {
            email,
            password
        } = this.state;

        const {
            history,
        } = this.props;

        auth.doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState(() => ({
                    ...INITIAL_STATE
                }));
                history.push(routes.HOME);
            })
            .catch(error => {
                console.log(error);
                this.setState(byPropKey('error', error));
            });

        event.preventDefault();
    }

    render() {
        const {
            email,
            password,
            error,
        } = this.state;

        const isInvalid = password === '' || email === '';
        return (
            <Popup>
                <h2 className="tm__title tm-popup__title"> Sign in </h2>
                <form onSubmit = {this.onSubmit}>
                    <div className="tm-input-container">
                        <input type="email"
                            placeholder="Email"
                            className="tm-input"
                            onChange={event => this.setState(byPropKey('email', event.target.value))}
                            value={email}
                          />
                    </div>
                    
                    <div className="tm-input-container">  
                        <input type="password"
                            placeholder="Password"
                            className="tm-input"
                            onChange={event => this.setState(byPropKey('password', event.target.value))}
                            value={password}
                        />
                    </div>  

                      { error && <p>{error.message}</p> }

                    <button type="submit" className="tm-btn tm-btn--primary mr">Sign in</button>
                    <Link className="tm-btn tm-btn--primary" to={routes.SIGN_UP}>Create an account</Link>
                </form>
            </Popup>
        )
    }
}

export default withRouter(SignIn)