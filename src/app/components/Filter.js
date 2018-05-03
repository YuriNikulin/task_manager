import React from 'react';
import Select from './Select.js';

class Filter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="tm-filter-container">
                <div className="tm-filter">
                    <Select title="Status">
                        <a onClick={this.handleClick} className="tm-filter__item tm-select__item" id="filterStatus">
                            Status
                        </a>
                    </Select>
                </div>
            </div>
        )
    }
}

export default Filter;