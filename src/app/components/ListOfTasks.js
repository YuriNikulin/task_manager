import React from 'react';

import { db } from '../services/firebase/firebase.js';
import { firebase } from '../services/firebase/';

import { Link } from 'react-router';

import { connect } from 'react-redux';

import actionAuthAlternate from '../redux/actions/authAlternate.js';
import actionFetchTasks from '../redux/actions/fetchTasks.js';
import tasksReducer from '../redux/reducers/';
import { FirebaseComp } from '../services/firebase/firebase.js';

class ListOfTasks extends React.Component {
    constructor(props) {
        // debugger;
        super(props);
        this.state = {
            tasksList: {},
            tasksArray: [],
            isLoaded: false
        };
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log(this.props);
        // debugger;
        // if (!this.areTasksListsDifferent(prevProps.tasksList, this.state.tasksList)) {
        //     return;
        // }
        if (this.state.isLoaded) {
            return;
        }
        this.maybeFetchTasks();
    }

    maybeFetchTasks = () => {
        const user = this.props.currentUser;

        console.log('maybe');
        if (!user) {
            return 0;
        }
        const userId = user.uid;

        var tasksList = [];
        let tasksObj = db.ref('/users/' + userId + '/tasks').once('value').then((snapshot) => {

            let tasksList = (snapshot.val());
            
            this.generateArrayOfTasks(tasksList);
        });
    }

    componentDidMount() {
        this.maybeFetchTasks();
    }

    generateArrayOfTasks(tasksList) {
        const tasksArray = [];

        for (var i in tasksList) {
            tasksArray.push(tasksList[i]);
        }
        if (tasksArray.length) {
            this.setState({
                isLoaded: true
            })
        }
        this.props.dispatch(actionFetchTasks(tasksArray));
        // this.setState({
        //     tasksArray
        // });
    }

    areTasksListsDifferent(obj1, obj2) {

        if (Object.keys(obj1).length != Object.keys(obj2).length) {
            return true;
        }

        for (let i in obj1) {
            if (obj1[i] != obj2[i]) return true;
        }

        return false;
    }

    render() {
        let tasksList = [];
        if (this.props.tasksList && this.props.tasksList.length) {
            console.log(this.props);
            tasksList = this.props.tasksList;
        }

        return (
            <div className="tm-tasks">
                <FirebaseComp func={actionAuthAlternate}/>
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
                                        <Link to={"/task" + item.taskId}>
                                            {item.taskName}
                                        </Link>    
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

const mapStateToProps = (state) => {
    return ({
        currentUser: state.auth.currentUser,
        tasksList: state.tasks.tasksList
    })
}

const mapDispatchToProps = (dispatch) => {
    return ({
        onAuth: () => {
            // dispatch(actionAuth());
        }
    })
}

export default connect(mapStateToProps)(ListOfTasks);