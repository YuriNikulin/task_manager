import React from 'react';
import Select from './Select.js';
import Sort from './Sort.js';

class SortButton extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Select title="Sort" className={"tm-view " + this.props.className}>
                <Sort />
            </Select>
        )
    }
}

export default SortButton;