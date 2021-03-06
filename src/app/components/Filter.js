import React from 'react';
import Select from './Select.js';
import * as taskProperties from '../constants/taskProperties';
import { connect } from 'react-redux';
import actionApplyFilter from '../redux/actions/applyFilter.js';
import actionRemoveFilter from '../redux/actions/removeFilter.js';
import Search from './Search.js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSearch: false
        }
    }

    handleClick = (event) => {
        let newFilter = {
            key: event.target.dataset.filterKey,
            value: event.target.dataset.filterValue
        }
        if (event.target.dataset.filterSelected == 'true') {
            this.removeFilter(newFilter);
        } else {
            this.applyFilter(newFilter);
        }
    }

    removeFilter = (filter) => {
        this.props.dispatch(actionRemoveFilter(filter))
    }

    applyFilter = (newFilter) => {
        console.log(newFilter);
        this.props.dispatch(actionApplyFilter(newFilter));
    }

    handleSearchButtonClick = () => {
        this.setState((prevState) => {
            return {
                showSearch: !prevState.showSearch
            }
        })
    }

    closeSearch = () => {
        this.setState({
            showSearch: false
        })
    }

    render() {
        let activeFilters = this.props.filter;
        let statusTitle = 'Status: ';
        let priorityTitle = 'Priority: ';
        for (let i = 0; i < activeFilters.length; i++) {
            if (activeFilters[i].key == 'taskStatus') {
                statusTitle += activeFilters[i].value + ' ';
            } else if (activeFilters[i].key == 'taskPriority') {
                priorityTitle += activeFilters[i].value + ' ';
            }
        }

        console.log(statusTitle, priorityTitle);    
        return(
            <div className="tm-filter-container">
                <div className="tm-filter">
                    <div onClick={this.handleSearchButtonClick} className="tm-filter-item tm-filter-item--search">
                        <div className="tm-filter-select">
                            <span className="tm-select__title">
                                Search
                            </span>
                        </div>
                    </div>
                    <div className="tm-filter-item">
                        <Select className="tm-filter-select" title={statusTitle}>
                        {taskProperties.statuses.map((item) => {
                            return (
                                <a key={item} onClick={this.handleClick} 
                                    data-filter-key="taskStatus" 
                                    data-filter-selected={statusTitle.includes(item)} 
                                    data-filter-value={item} 
                                    className="tm-select__item">
                                    {item}
                                </a>
                            )
                        })}
                        </Select>
                    </div>
                    <div className="tm-filter-item">
                        <Select className="tm-filter-select" title={priorityTitle}>
                        {taskProperties.priorities.map((item) => {
                            return (
                                <a key={item} onClick={this.handleClick} 
                                    data-filter-key="taskPriority" 
                                    data-filter-selected={priorityTitle.includes(item)} 
                                    data-filter-value={item} 
                                    className="tm-select__item">
                                    {item}
                                </a>
                            )
                        })}
                        </Select>
                    </div>
                    {this.state.showSearch && 
                        <Search closeHandler={this.closeSearch} />
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        filter: state.tasks.tasksFilter
    })
}

export default connect(mapStateToProps)(Filter);