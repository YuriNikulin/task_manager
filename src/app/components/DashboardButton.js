import React from 'react';
import { Link, browserHistory, hashHistory } from 'react-router';

const DashboardButton = (props) => {
    return (
        <Link to="/" className={"tm__dasboard " + props.className}>Dashboard</Link>
    )
} 

export default DashboardButton;