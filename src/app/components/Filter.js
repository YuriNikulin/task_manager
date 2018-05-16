import React from 'react';
import Select from './Select.js';
import * as taskProperties from '../constants/taskProperties';
import { connect } from 'react-redux';
import actionApplyFilter from '../redux/actions/applyFilter.js';
import actionRemoveFilter from '../redux/actions/removeFilter.js';
import Search from './Search.js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Menu, Dropdown } from 'antd';               

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSearch: false
        }
    }

    componentDidMount() {
        console.log('filter mounted');
    }

    componentDidUpdate() {
        console.log('filter updated');
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
                            <Dropdown placement="bottomCenter" overlay={
                                <Menu onClick={this.handleClick}>
                                    {taskProperties.statuses.map((item) => {
                                        return (
                                            <Menu.Item 
                                            key={item}
                                            data-filter-key="taskStatus"
                                            data-filter-selected={statusTitle.includes(item)}
                                            data-filter-value={item}>
                                                {item}
                                            </Menu.Item>
                                        )
                                    })}
                                </Menu>
                            }
                            >
                            <a>{statusTitle}</a>
                            </Dropdown>
                        </Menu.Item>
                        <Menu.Item className="tm-filter-item" key="priorities">
                            <Dropdown placement="bottomCenter" overlay={
                                <Menu onClick={this.handleClick}>
                                    {taskProperties.priorities.map((item) => {
                                        return (
                                            <Menu.Item 
                                            key={item}
                                            data-filter-key="taskPriority"
                                            data-filter-selected={priorityTitle.includes(item)}
                                            data-filter-value={item}>
                                                {item}
                                            </Menu.Item>
                                        )
                                    })}
                                </Menu>
                            }
                            >
                            <a>{priorityTitle}</a>
                            </Dropdown>
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