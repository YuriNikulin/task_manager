import React from 'react';
import Select from './Select.js';
import changeView from '../redux/actions/changeView.js';
import { connect } from 'react-redux';

class ViewSwitcher extends React.Component {
    constructor(props) {
        super(props);
    }
    handleClick = (event) => {
        this.props.dispatch(changeView(event.target.id));
    }
    render() {
        return (
            <Select className={"tm-view " + this.props.className} title="View" closeOnSelect={true}>
                <a onClick={this.handleClick} className="tm-view__item tm-select__item" id="viewList">
                    List
                </a>
                <a onClick={this.handleClick} className="tm-view__item tm-select__item" id="viewGrid">
                    Grid
                </a>
            </Select>
        )
    }
}

export default connect()(ViewSwitcher);