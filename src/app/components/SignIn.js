import React from 'react';
import Popup from './tools/Popup.js';
import { Link } from 'react-router-dom';
import * as routes from './tools/routes';

export default class SignIn extends React.Component {
    render() {
        return (
            <Popup>
                <h1> Sign in! </h1>
                <form>
                    <input type="text" placeholder="login" />
                    <input type="password" placeholder="password" />
                    <a className="btn btn--primary">Log in</a>
                    <Link className="btn btn--primary" to={routes.SIGN_UP}>Create an account</Link>
                </form>
            </Popup>
        )
    }
}