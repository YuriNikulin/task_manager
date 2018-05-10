import React from 'react';
import { taskProperties } from '../constants/taskProperties.js';
import actionSort from '../redux/actions/sort.js';
import { connect } from 'react-redux';

class Sort extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick = (event) => {
        let key = event.target.dataset.sortKey;
        this.props.dispatch(actionSort(key));
    }

    render() {
        return (
            <div>
                {taskProperties.map((item) => {
                    return(
                        <a onClick={this.handleClick} key={item.key} data-sort-key={item.key} className="tm-select__item">
                           {item.keyPrint}
                        </a>
                    )
                })}
            </div>
        )
    }
}

export default connect()(Sort);