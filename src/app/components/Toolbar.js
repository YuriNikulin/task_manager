import React from 'react';
import { Link, withRouter, } from 'react-router-dom';
import CreateTaskButton from './CreateTaskButton.js';
import DashboardButton from './DashboardButton.js';


class Toolbar extends React.Component {
    render() {
        return (
            <div className="tm-toolbar">
                <DashboardButton className="tm-toolbar__item" />
                <CreateTaskButton className="tm-toolbar__item" />
            </div>
        )
    }
}

export default Toolbar;