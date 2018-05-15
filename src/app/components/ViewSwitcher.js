import React from 'react';
import Select from './Select.js';
import changeView from '../redux/actions/changeView.js';
import { connect } from 'react-redux';
import { Menu } from 'antd';

class ViewSwitcher extends React.Component {
    constructor(props) {
        super(props);
    }
    handleClick = (event) => {
        this.props.dispatch(changeView(event.key));
    }
    render() {
        return (
            <Menu onSelect={this.handleClick}>
                <Menu.Item onSelect={this.handleClick} key="viewList">
                    List
                </Menu.Item>
                <Menu.Item onSelect={this.handleClick} key="viewGrid">
                    Grid
                </Menu.Item>
                <Menu.Item onSelect={this.handleClick} key="viewScrum">
                    Scrum
                </Menu.Item>
            </Menu>
        )
    }
}

export default connect()(ViewSwitcher);