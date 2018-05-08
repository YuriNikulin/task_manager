import React from 'react';
import WithTasks from './withTasks.js';
import WithTasksConnect from './withTasksConnect.js';

const Inline = (props) => {
    console.log(props);
    return (
        <div>
            Inline
        </div>
    )
}

export default WithTasks(Inline);