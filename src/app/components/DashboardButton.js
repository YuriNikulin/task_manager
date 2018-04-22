import React from 'react';
import { NavLink, withRouter} from 'react-router-dom';

import * as routes from './tools/routes';

const DashboardButton = (props) => {
    return (
        <NavLink exact to="/" className={"tm__dasboard " + props.className}>Dashboard</NavLink>
    )
} 

export default DashboardButton;