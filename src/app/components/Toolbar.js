import React from 'react';
import { Link, browserHistory, hashHistory } from 'react-router';
import CreateTaskButton from './CreateTaskButton.js';
import DashboardButton from './DashboardButton.js';
import ViewSwitcher from './ViewSwitcher.js';
import FilterButton from './FilterButton.js';
import LogOut from './LogOut.js';
import Filter from './Filter.js';

import Transition from 'react-transition-group/Transition';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showFilter: false
        }
    }
    handleFilterButtonClick = () => {
        this.setState((prevState) => {
            return {
                showFilter: !prevState.showFilter
            };
        })
    }
    render() {
        return (
            <div className="tm-toolbar-container">
                <div className="tm-toolbar">
                    <DashboardButton className="tm-toolbar__item" />
                    <CreateTaskButton className="tm-toolbar__item" />
                    <ViewSwitcher className="tm-toolbar__item" />
                    <FilterButton onClick={this.handleFilterButtonClick} className={"tm-toolbar__item " + (this.state.showFilter ? 'active' : '')} />
                    <LogOut className="tm-toolbar__item" />
                </div>
                <ReactCSSTransitionGroup 
                    transitionName="filter"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                >
                    {this.state.showFilter && 
                        <Filter key='filter' />
                    }
                    </ReactCSSTransitionGroup>
            </div>
        )
    }
}

export default Toolbar;