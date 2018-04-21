import React from 'react';
import { Link } from 'react-router-dom';
import SignOut from './SignOut';

import AuthUserContext from './AuthUserContext';

import * as routes from './tools/routes';

const Navigation = () =>
    
    <AuthUserContext.Consumer>
        { authUser => authUser
            ? <NavigationAuth />
            : <NavigationNonAuth />
        }
    </AuthUserContext.Consumer>    
    

const NavigationNonAuth = () =>
    <div>
    </div>


const NavigationAuth = () =>
  <div>
    <ul>
    </ul>
    <SignOut />
  </div>

export default Navigation;