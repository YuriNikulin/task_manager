import React from 'react';
import { Link } from 'react-router';
import { taskProperties } from '../../constants/taskProperties.js';
import { Table } from 'antd';

class TasksList extends React.Component {
    constructor(props) {
        super(props);
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
            item.render = (text, record) => {
                return <div></div>
            }
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
                pagination={false}
                columns={columns}
                bordered
                expandRowByClick
                onRow={(record) => {
                    return {
                        onClick: this.handleClick
                    }
                }}
                /> 
        )
    }
}

export default TasksList;