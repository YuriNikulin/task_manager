import React from 'react';
import { taskProperties } from '../constants/taskProperties.js';
import actionSort from '../redux/actions/sort.js';
import { connect } from 'react-redux';
import { Menu } from 'antd';

class Sort extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick = (event) => {
        let key = event.key;
        this.props.dispatch(actionSort(key));
    }

    render() {
        return (
            <Menu onClick={this.handleClick}>
                {taskProperties.map((item) => {
                    return(
                        <Menu.Item onClick={this.handleClick} key={item.key} data-sort-key={item.key} className="tm-select__item">
                           {item.keyPrint}
                        </Menu.Item>
                    )
                })}
            </Menu>
        )
    }
}

export default connect()(Sort);