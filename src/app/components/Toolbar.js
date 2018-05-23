import React from 'react';
import { Link, browserHistory, hashHistory } from 'react-router';
import ViewSwitcher from './ViewSwitcher.js';
import LogOut from './LogOut.js';
import Filter from './Filter.js';
import Sort from './Sort.js';
import { Menu, Dropdown } from 'antd';
import Transition from 'react-transition-group/Transition';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showFilter: false,
            current: this.props.currentLocation,
        }
    }

    componentDidUpdate() {
        console.log('updated', this.state);
    }

    handleClick = (event) => {
        let key = event.key;
        switch (key) {
            case 'filterbutton': this.props.toggleFilter(); break;
            default: return;
        }
    }

    render() {
        const tasksUtils = this.props.listOfTasks;
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
                    {tasksUtils && <Menu.Item key="filterbutton">
                        Filter
                    </Menu.Item>}
                    {tasksUtils &&<Menu.Item key="sortbutton">
                        <Dropdown overlay={<Sort />} placement="bottomCenter">
                            <a>Sort</a>
                        </Dropdown>
                    </Menu.Item>}
                    {tasksUtils &&<Menu.Item key="view">
                        <Dropdown overlay={<ViewSwitcher/>} placement="bottomCenter">
                            <a>View</a>
                        </Dropdown>
                    </Menu.Item>}
                    <Menu.Item className="flr" key="logout">
                        <LogOut />
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}

export default Toolbar;