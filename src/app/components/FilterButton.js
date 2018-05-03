import React from 'react';
import Select from './Select.js';
import changeView from '../redux/actions/changeView.js';
import { connect } from 'react-redux';

class FilterButton extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <a onClick={this.props.onClick} className={"tm__dasboard " + this.props.className}>Filter</a>
        )
    }
}

export default connect()(FilterButton);