import React from 'react';
import { Link } from 'react-router-dom';
import SignOut from './SignOut';

import * as routes from './tools/routes';

const Navigation = ({authUser}) =>
    <div>
        { authUser 
            ? <NavigationAuth />
            : <NavigationNonAuth />
        }
    </div>

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