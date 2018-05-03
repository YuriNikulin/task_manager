import React from 'react';

import { db } from '../../services/firebase/firebase.js';
import { firebase } from '../../services/firebase/';

import { Link } from 'react-router';

import { connect } from 'react-redux';

import Transition from 'react-transition-group/Transition';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import actionAuthAlternate from '../../redux/actions/authAlternate.js';
import actionFetchTasks from '../../redux/actions/fetchTasks.js';
import tasksReducer from '../../redux/reducers/';
import { FirebaseComp } from '../../services/firebase/firebase.js';

import TasksList from './TasksList.js';
import TasksGrid from './TasksGrid.js';

import Preloader from '../Preloader/Preloader.js';

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
        if (tasksArray.length || this.props.currentUser) {
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
            tasksList = this.props.tasksList;
        }

        let TasksView;

        switch (this.props.tasksView) {
            case 'viewList': TasksView = TasksList; break;
            case 'viewGrid': TasksView = TasksGrid; break;
            default: TasksView = TasksList
        }

        return (
            <div>
                <ReactCSSTransitionGroup 
                    transitionName="fade"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                >
                    {this.state.isLoaded ? 
                        <div key="tasksList"className="tm-tasks">
                            <TasksView tasksList={tasksList}/>
                        </div>
                        :
                        <Preloader key="preloader"/>
                    }
                </ReactCSSTransitionGroup>     
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        currentUser: state.auth.currentUser,
        tasksList: state.tasks.tasksList,
        tasksView: state.tasks.tasksView
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