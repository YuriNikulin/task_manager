import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import SignOut from './SignOut';

import AuthUserContext from './AuthUserContext';

import * as routes from './tools/routes';

const Navigation = (props) => {
    const {history} = props;
    const settings = {};

    return (
        <AuthUserContext.Consumer>
            { authUser => authUser
                ? <NavigationAuth />
                : <NavigationNonAuth />
            }
        </AuthUserContext.Consumer>
    ) 
}
    

const NavigationNonAuth = () =>
    <div>
    </div>


const NavigationAuth = () =>
  <div className="tm-navbar">
    <SignOut className="tm-navbar__item" />      
  </div>

export default withRouter(Navigation);