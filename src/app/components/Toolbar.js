import React from 'react';
import { Link, browserHistory, hashHistory } from 'react-router';
import CreateTaskButton from './CreateTaskButton.js';
import DashboardButton from './DashboardButton.js';
import ViewSwitcher from './ViewSwitcher.js';
import FilterButton from './FilterButton.js';
import LogOut from './LogOut.js';
import Filter from './Filter.js';
import SortButton from './SortButton.js';
import { Menu, Dropdown } from 'antd';
import Transition from 'react-transition-group/Transition';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showFilter: false,
            current: 'home',
        }
    }

    componentDidUpdate() {
        console.log('updated');
    }

    handleFilterButtonClick = () => {
        this.setState((prevState) => {
            return {
                showFilter: !prevState.showFilter
            };
        })
    }
    handleClick = (event) => {
        this.setState({
            current: event.key
        });
       let key = event.key;
       this.handleFilterButtonClick();
    }

    render() {
        const MMenu = (
            <Menu>
                <Menu.Item key='1'>1</Menu.Item>
                <Menu.Item key='2'>2</Menu.Item>
                <Menu.Item key='3'>3</Menu.Item>
            </Menu>
        )

        return (
            <div className="tm-toolbar-container">
                <div className="tm-toolbar">
                    <Menu
                        mode="horizontal"
                        onSelect={this.handleClick}
                        selectedKeys={[this.state.current]}
                        >
                        <Menu.Item key="dashboard">
                            <Link to="/">
                                Dashboard
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="createtask">
                            <Link to="/createtask">
                                Create a task
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="filterbutton">
                            <FilterButton />
                        </Menu.Item>
                    </Menu>
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