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
            <a className={"tm__filter-button " + this.props.className}>Filter</a>
        )
    }
}

export default connect()(FilterButton);