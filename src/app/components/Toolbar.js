import React from 'react';
import { Link, browserHistory, hashHistory } from 'react-router';
import CreateTaskButton from './CreateTaskButton.js';
import DashboardButton from './DashboardButton.js';
import ViewSwitcher from './ViewSwitcher.js';
import LogOut from './LogOut.js';


class Toolbar extends React.Component {
    render() {
        return (
            <div className="tm-toolbar">
                <DashboardButton className="tm-toolbar__item" />
                <CreateTaskButton className="tm-toolbar__item" />
                <ViewSwitcher className="tm-toolbar__item" />
                <LogOut className="tm-toolbar__item" />
            </div>
        )
    }
}

export default Toolbar;