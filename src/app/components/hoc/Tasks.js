import React from 'react';
import withTasks from './withTasks2.js';

class Tasks extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props);
        return (
            <div>
                TASKS VIEW: {this.props.tasksView}
            </div>
        )
    }
}

export default withTasks(Tasks);