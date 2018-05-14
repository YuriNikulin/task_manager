import React from 'react';
import { connect } from 'react-redux';
import actionApplyFilter from '../redux/actions/applyFilter.js';
import actionRemoveFilter from '../redux/actions/removeFilter.js';
import actionRemoveAllFilters from '../redux/actions/removeAllFilters.js';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFocused: false
        }
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
        setTimeout(() => {
            this.input.blur();
            this.input.focus();
        }, 10)
        
    }

    componentDidUpdate() {
        
    }

    componentDidMount() {
        this.input.focus();
    }

    handleFocus = (event) => {
        this.setState({
            isFocused: true
        })
    }

    handleBlur = (event) => {
        this.setState({
            isFocused: false
        })

    }

    close = () => {
        this.props.closeHandler();
        this.props.dispatch(actionRemoveAllFilters());
    }

    handleKey = (event) => {
        if (event.key == 'Escape' || event.keyCode == 27) {
            this.close();
        }
    }

    render() {
        return (
            <div className={'tm-search-container' + (this.state.isFocused ? ' focused' : '')}>
                <input onFocus={this.handleFocus} 
                    onBlur={this.handleBlur} 
                    onChange={this.handleChange}
                    onKeyDown={this.handleKey}
                    className='tm-search__input' 
                    placeholder="Search..." 
                    ref={(elem) => { this.input = elem; }}
                    type="text" />

                <a className="tm-search__magnifier tm-search__button ">
                    <i className="icon-search"></i>
                </a>    
                <a onClick={this.close} className="tm-search__close tm-search__button">
                    <i className="icon-cross"></i>
                </a>
            </div>
        )
    }
}

export default connect()(Search);