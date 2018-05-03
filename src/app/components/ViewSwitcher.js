import React from 'react';
import Select from './Select.js';

class ViewSwitcher extends React.Component {
    constructor(props) {
        super(props);
    }
    handleClick = (event) => {
        console.log(event.target.id);
    }
    render() {
        return (
            <Select className={"tm-view " + this.props.className} title="View">
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

export default ViewSwitcher;