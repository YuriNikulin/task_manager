import React from 'react';
import { Link } from 'react-router';
import { taskProperties, statuses, priorities } from '../../constants/taskProperties.js';
import { Table } from 'antd';
import store from '../../redux';
import actionApplyFilter from '../../redux/actions/applyFilter.js';
import actionRemoveFilter from '../../redux/actions/removeFilter.js';
import actionRemoveAllFilters from '../../redux/actions/removeAllFilters.js';

class TasksList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterValue: ''
        }
    }

    divideFiltersByKeys = (filters) => {

        var filtersObj = {};
        for (var i = 0; i < filters.length; i++) {
            if (!filtersObj[filters[i].key]) {
                filtersObj[filters[i].key] = [];
            }
            filtersObj[filters[i].key].push(filters[i].value);
        }
        return filtersObj;
    }

    handleTableChange = (pagination, filters, sorter) => {
        store.dispatch(actionRemoveAllFilters());
        for (var key in filters) {
            if (!filters[key]) continue;
            for (var i = 0; i < filters[key].length; i++) {
                let newFilter = {
                    key: key,
                    value: filters[key][i]
                }
                store.dispatch(actionApplyFilter(newFilter));
            }
        }
    }

    generateAntdColumns = (items) => {
        let columns = [];
        columns.push({
            title: 'Name',
            dataIndex: 'taskName',
            key: 'taskName',
            render: (text, record) => {
                return(
                    <Link to={"/task" + record.taskId}>
                        {record.taskName}
                    </Link>
                )
            },
            sorter: (a, b) => {return (a['taskName'] > b['taskName'] ? 1 : -1)}
        })

        let filtersObj = this.divideFiltersByKeys(this.props.tasksFilter);

        items.map((item) => {
            if (item.key=='taskCreationDate' || item.key=='taskName') {
                return;
            }
            columns.push({
                title: item.keyPrint,
                dataIndex: item.key,
                key: item.key,
                sorter: (a, b) => {return (a[item.key] > b[item.key] ? 1 : -1)}
            })
            if (item.key == 'taskStatus' || item.key == 'taskPriority') {
                let activeColumn = columns[columns.length - 1];
                let filterKeys = (item.key == 'taskStatus' ? statuses : priorities);
                activeColumn.filters = [];
                activeColumn.filteredValue = (filtersObj[item.key] || null);
                activeColumn.filtered = true;

                filterKeys.map((filterKey) => {
                    activeColumn.filters.push({
                        text: filterKey,
                        value: filterKey
                    });
                    activeColumn.onFilter = (value, record) => {
                        return (
                            record[item.key] === value
                        )
                    }
                })
            } 
        })
        columns.push({
            title: 'Created',
            dataIndex: 'taskCreationDatePrint',
            key: 'taskCreationDatePrint',
            sorter: (a, b) => {return (Date.parse(a['taskCreationDate']) > Date.parse(b['taskCreationDate']) ? 1 : -1)}
        })

        return columns;
    }

    generateAntdData = (items) => {
        let data = [];
        items.map((item) => {
            item.taskCreationDatePrint = new Date(item.taskCreationDate).toLocaleString();
            item.key = item.taskId;
            data.push(item);
        })
        return data;
    }

    render() {
        const data = this.generateAntdData(this.props.tasksList);
        const columns = this.generateAntdColumns(taskProperties);
        return (
            <Table 
                dataSource={data} 
                columns={columns}
                bordered
                expandRowByClick
                onRow={(record) => {
                    return {
                        onClick: this.handleClick
                    }
                }}
                onChange={this.handleTableChange}
                /> 
        )
    }
}

export default TasksList;