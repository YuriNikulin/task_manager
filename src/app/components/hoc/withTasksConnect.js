import React from 'react';
import { connect } from 'react-redux';
import WithTasks from './withTasks.js';

const WithTasksConnect = (props) => {
    console.log(props);
    debugger;
    return (
        () => {
            <div>
            </div>
        }
    )
}

const mapStateToProps = (store) => {
    return ({
        tasks: store.tasks.tasksList
    })
}

export default connect(mapStateToProps)(WithTasksConnect);