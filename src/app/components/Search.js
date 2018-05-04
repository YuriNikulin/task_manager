import React from 'react';
import { connect } from 'react-redux';
import actionApplyFilter from '../redux/actions/applyFilter.js';
import actionRemoveFilter from '../redux/actions/removeFilter.js';
import actionRemoveAllFilters from '../redux/actions/removeAllFilters.js';

class Search extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChange = (event) => {
        this.props.dispatch(actionRemoveAllFilters());
        let searchPhrase = event.target.value;
        if (!searchPhrase) {
            return;
        }
        let newFilter = {
            key: 'taskName',
            value: searchPhrase
        };
        this.props.dispatch(actionApplyFilter(newFilter));
    }

    render() {
        return (
            <div className='tm-search-container'>
                <input onChange={this.handleChange} className='tm-search__input' placeholder="Search..." type="text" />
                <i className="tm-search__magnifier tm-search__button icon-search"></i>
                <a className="tm-search__close tm-search__button">
                    <i className="icon-cross"></i>
                </a>
            </div>
        )
    }
}

export default connect()(Search);