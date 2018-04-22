import React from 'react';
import * as routes from './tools/routes';

import { db } from './firebase/firebase.js';
import { firebase } from './firebase/';

class ListOfTasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasksList: {},
            tasksArrow: []
        };
    }

    componentDidMount() {
        const userId = firebase.auth.currentUser.uid;
        var tasksList = [];
        let tasksObj = db.ref('/users/' + userId + '/tasks').once('value').then((snapshot) => {
            this.setState({
                tasksList: (snapshot.val()) 
            });
            this.generateArrayOfTasks();
        });
    }

    generateArrayOfTasks() {
        const tasksArrow = [];
        for (var i in this.state.tasksList) {
            tasksArrow.push(this.state.tasksList[i]);
        }
        this.setState({
            tasksArrow
        });
    }

    render() {
        const tasksList = this.state.tasksArrow;
        console.log(tasksList);
        return (
            <div className="tm-tasks">
                <table className="tm-table tm-tasks-table">
                    <thead>
                        <tr>
                            <td>
                                <span>
                                    Name
                                </span>
                            </td>
                            <td>
                                <span>
                                    Status
                                </span>
                            </td>
                            <td>
                                <span>
                                    Priority
                                </span>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                    {tasksList.map((item) => {
                        return (
                            <tr key={item.taskId} className="tm-tasks-item">
                                <td>
                                    <span className="tm-tasks-item__name">
                                        {item.taskName}
                                    </span>
                                </td>
                                <td>
                                    <span className="tm-tasks-item__status">
                                        {item.taskStatus}
                                    </span>
                                </td>
                                <td>
                                    <span>
                                        {item.taskPriority}
                                    </span>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ListOfTasks;