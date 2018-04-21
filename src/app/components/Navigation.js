import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from './tools/routes';

const Navigation = () =>
  <div>
    <ul>
      <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
    </ul>
  </div>

export default Navigation;