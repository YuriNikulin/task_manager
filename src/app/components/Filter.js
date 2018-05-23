import React from 'react';
import * as taskProperties from '../constants/taskProperties';
import { connect } from 'react-redux';
import actionApplyFilter from '../redux/actions/applyFilter.js';
import actionRemoveFilter from '../redux/actions/removeFilter.js';
import Search from './Search.js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Menu, Dropdown, Select } from 'antd';               
const Option = Select.Option;

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSearch: false
        }
    }

    componentDidMount() {
        
    }

    componentDidUpdate() {
        
    }

    handleClick = (event) => {
        if (event.key == 'statuses' || event.key == 'priorities') return;
        if (event.key == 'search') {
            this.handleSearchButtonClick();
            return;
        }

        let data = event.item.props;
        let newFilter = {
            key: data['data-filter-key'],
            value: data['data-filter-value']
        }
        if (data['data-filter-selected'] ) {
            this.removeFilter(newFilter);
        } else {
            this.applyFilter(newFilter);
        }
    }

    handleFilterSelect = (data, elem) => {
        let newFilter = {
            key: elem.props['data-filter-key'],
            value: data
        }
        this.applyFilter(newFilter);
    }

    handleFilterDeselect = (data, elem) => {
        let newFilter = {
            key: elem.props['data-filter-key'],
            value: data
        }
        this.removeFilter(newFilter);
    }

    removeFilter = (filter) => {
        this.props.dispatch(actionRemoveFilter(filter))
    }

    applyFilter = (newFilter) => {
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
        this.forceUpdate();
        this.setState({
            showSearch: false
        })
    }

    render() {
        console.log('rerendered');
        let activeFilters = this.props.filter;
        let statusFilters = [];
        let priorityFilters = [];
        for (let i = 0; i < activeFilters.length; i++) {
            if (activeFilters[i].key == 'taskStatus') {
                statusFilters.push(activeFilters[i].value);
            } else if (activeFilters[i].key == 'taskPriority') {
                priorityFilters.push(activeFilters[i].value);
            }
        }
  
        return(
            <div className="tm-filter-container">
                <div className="tm-filter">
                    <Menu 
                        mode='horizontal'
                        selectable={false}
                        onClick={this.handleClick}>
                        <Menu.Item onClick={this.handleSearchButtonClick} key="search">
                            Search
                        </Menu.Item>
                        <Menu.Item className="tm-filter-item" key="statuses">
                            <Select
                                mode="multiple"
                                placeholder="Status"
                                value={statusFilters}
                                onSelect={this.handleFilterSelect}
                                onDeselect={this.handleFilterDeselect}
                                >
                                {taskProperties.statuses.map((item) => {
                                    return (
                                        <Option
                                            key={item}
                                            value={item}
                                            data-filter-key="taskStatus"
                                            data-filter-value={item}
                                        >
                                            {item}
                                        </Option>
                                    )
                                })}
                            </Select>
                        </Menu.Item>
                        <Menu.Item className="tm-filter-item" key="priorities">
                            <Select
                                mode="multiple"
                                placeholder="Priority"
                                value={priorityFilters}
                                onSelect={this.handleFilterSelect}
                                onDeselect={this.handleFilterDeselect}
                                >
                                {taskProperties.priorities.map((item) => {
                                    return (
                                        <Option
                                            key={item}
                                            data-filter-key="taskPriority"
                                            data-filter-value={item}
                                        >
                                            {item}
                                        </Option>
                                    )
                                })}
                            </Select>
                        </Menu.Item>
                        {this.state.showSearch && 
                            <Search closeHandler={this.closeSearch} />
                        }
                    </Menu>
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