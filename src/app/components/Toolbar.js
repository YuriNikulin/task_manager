import React from 'react';
import { Link, browserHistory, hashHistory } from 'react-router';
import CreateTaskButton from './CreateTaskButton.js';
import DashboardButton from './DashboardButton.js';
import ViewSwitcher from './ViewSwitcher.js';
import FilterButton from './FilterButton.js';
import LogOut from './LogOut.js';
import Filter from './Filter.js';
import Sort from './Sort.js';
import SortButton from './SortButton.js';
import { Menu, Dropdown } from 'antd';
import Transition from 'react-transition-group/Transition';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showFilter: false,
            current: 'dash',
        }
    }

    componentDidUpdate() {
        console.log('updated', this.state);
    }

    handleFilterButtonClick = () => {
        
    }

    handleClick = (event) => {
        let key = event.key;
        switch (key) {
            case 'filterbutton': this.props.toggleFilter(); break;
            default: return;
        }
    }

    render() {
        const testMenu = (
            <Menu>
                <Menu.Item key="1">
                    1
                </Menu.Item>
                <Menu.Item key="2">
                    2
                </Menu.Item>
            </Menu>
        )
        return (
            <div>
                <Menu
                    mode="horizontal"
                    onClick={this.handleClick}
                    selectable={false}
                    selectedKeys={[this.state.current]}
                    >
                    <Menu.Item key="dash">
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
                        Filter
                    </Menu.Item>
                    <Menu.Item key="sortbutton">
                        <Dropdown overlay={<Sort />} placement="bottomCenter">
                            <a>Sort</a>
                        </Dropdown>
                    </Menu.Item>
                    <Menu.Item key="view">
                        <Dropdown overlay={<ViewSwitcher/>} placement="bottomCenter">
                            <a>View</a>
                        </Dropdown>
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}

export default Toolbar;