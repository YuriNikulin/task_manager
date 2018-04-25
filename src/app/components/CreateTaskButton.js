import React from 'react';
import { Link, browserHistory, hashHistory } from 'react-router';

const CreateTaskButton = (props) => {
    return (
        <Link to="/createtask" className={"tm__create " + props.className}>Create a task</Link>
    )
}

export default CreateTaskButton;