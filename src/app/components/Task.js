import React from 'react';
import { connect } from 'react-redux';
import { db } from '../services/firebase/firebase.js';
import { firebase } from '../services/firebase';
import { FirebaseComp } from '../services/firebase/firebase.js';
import { browserHistory as history } from 'react-router';
import actionAuthAlternate from '../redux/actions/authAlternate.js';
import * as taskProperties from '../constants/taskProperties';
import Toolbar from './Toolbar.js';
import Preloader from './Preloader/Preloader.js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import actionPushNotification from '../redux/actions/pushNotification.js';


class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            isChanging: false,
            taskName: '',
            taskDescription: '', 
            taskPriority: '', 
            estimatedTime: '', 
            loggedTime: '',
            remainingTime: '', 
            taskStatus: '',
        }
    }

    componentDidMount() {
        this.maybeFetchTask();
    }

    componentDidUpdate() {
        if (this.state.isLoaded) return;
        this.maybeFetchTask();
    }

    maybeFetchTask = () => {
        const user = this.props.currentUser;
        if (!user) return

        const userId = user.uid;
        db.ref('/users/' + userId + '/tasks/' + this.props.params.id).once('value').then((snapshot) => {
            let task = (snapshot.val());
            if (!task) return;
            if (!task.remainingTime) {
                task.remainingTime = task.estimatedTime;
            }
            this.setState({
                ...task,
                isLoaded: true
            });

        });
    }

    onAuth = () => 
        this.props.dispatch(actionAuthAlternate());

    toggleChangingMode = () => {
        this.setState((prevState, currentState) => {
            return {
                isChanging: !prevState.isChanging
            }
        })
    }

    handleRemove = () => {
        const user = this.props.currentUser;
        const userId = user.uid;
        db.ref('/users/' + user.uid + '/tasks/' + this.props.params.id).set(null).then(() => {

            this.props.dispatch(actionPushNotification({
                text: `Task ${this.state.taskName} has been removed`, 
                duration: 3000
            }));

            history.push('/');
        });
    }

    handleSave = () => {
        let {taskName, taskDescription, taskPriority, estimatedTime, loggedTime, remainingTime, taskStatus, taskId, taskCreationDate} = this.state;
        const user = this.props.currentUser;
        const userId = user.uid;
        let updates = {};
        if (Number(estimatedTime) && Number(loggedTime)) {
            if (Number(remainingTime)) {
                remainingTime = remainingTime - loggedTime;
            } else {
                remainingTime = estimatedTime - loggedTime;
            }
            if (remainingTime < 0) remainingTime = 0;
        }

        updates['/users/' + user.uid + '/tasks/' + this.props.params.id] = {taskId, taskName, taskDescription, taskPriority, estimatedTime, remainingTime, taskStatus, taskCreationDate};
        db.ref().update(updates).then(() => {
            this.setState({
                isChanging: false,
                isLoaded: false,
                loggedTime: '',
            });
            this.props.dispatch(actionPushNotification({text: 'The task has been updated', duration: 3000}));
            this.maybeFetchTask();
        });
        
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    render() {
        return (
            <div>
                <Toolbar />
                <ReactCSSTransitionGroup 
                    transitionName="fade"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                >
                    {this.state.isLoaded 
                        ? 
                        <div>
                            <div key="task" className="tm-task">
                                <form>
                                    <div className="tm-task-header tm-task-container">
                                        <input disabled={!this.state.isChanging} type="text" onChange={this.handleChange} value={this.state.taskName} id="taskName" className="tm-task-input tm-task__title" />
                                        <span className="tm-task-date">
                                            Created&nbsp; 
                                            <span className="tm-task-date__date">
                                                {new Date(this.state.taskCreationDate).toLocaleString()}
                                            </span>
                                        </span>
                                        <div className="tm-task-header-right">
                                            <a onClick={this.toggleChangingMode} className="tm-btn--primary tm-btn tm-task-header__button mr">
                                                {this.state.isChanging ? 'Cancel' : 'Edit'}
                                            </a>
                                            <a onClick = {this.handleRemove} className="tm-btn--warning tm-btn tm-task-header__button">
                                                Delete task
                                            </a>
                                        </div>
                                    </div>
                                    <div className="tm-task-info tm-task-container">
                                        <div className="tm-task-info-item tm-task-status">
                                            <label className="tm-task__label">
                                                Status
                                            </label>
                                            <select disabled={!this.state.isChanging} onChange={this.handleChange} value={this.state.taskStatus} id="taskStatus" className="tm-task-select">
                                                {taskProperties.statuses.map((item) => 
                                                    <option key={item} value={item}>
                                                        {item}
                                                    </option>    
                                                )}
                                            </select>
                                        </div>

                                        <div className="tm-task-info-item tm-task-status">
                                            <label className="tm-task__label">
                                                Priority
                                            </label>
                                            <select disabled={!this.state.isChanging} onChange={this.handleChange} value={this.state.taskPriority} id="taskPriority" className="tm-task-select">
                                                {taskProperties.priorities.map((item) => 
                                                <option key={item} value={item}>
                                                        {item}
                                                </option>    
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                    <div className='tm-task-estimated tm-task-container'>
                                        <div className="tm-task-estimated-item">
                                            <label className="tm-task__label">
                                                Estimated time
                                            </label>
                                            <input disabled={!this.state.isChanging} onChange={this.handleChange} type="number" id="estimatedTime" value={this.state.estimatedTime} className="tm-task-input tm-task-estimated__input" />
                                        </div>
                                        <div className="tm-task-estimated-item">
                                            <label className="tm-task__label">
                                                Log time
                                            </label>
                                            <input disabled={!this.state.isChanging} onChange={this.handleChange} type="number" id="loggedTime" value={this.state.loggedTime} className="tm-task-input tm-task-estimated__input" />
                                        </div>
                                        <div className="tm-task-estimated-item">
                                            <label className="tm-task__label">
                                                Remaining time
                                            </label>    
                                            <input disabled={true} type="number" value={this.state.remainingTime} className="tm-task-input tm-task-estimated__input" />
                                        </div>
                                    </div>
                                    <div className="tm-task-description tm-task-container">
                                        <div className="tm-task-description-item">
                                            <label className="tm-task__label">
                                                Task description
                                            </label>    
                                            <textarea disabled={!this.state.isChanging} id="taskDescription" onChange={this.handleChange} className="tm-task-input tm-task-description__input" value={this.state.taskDescription}>
                                            </textarea>
                                        </div>
                                    </div>
                                    <div className="tm-task-footer tm-task-container">
                                        <a onClick={this.handleSave} className="tm-btn tm-btn--primary">
                                            Save changes
                                        </a>
                                    </div>
                                </form>
                            </div> 
                        </div>

                        :

                        <Preloader key="preloader" />
                    }
                </ReactCSSTransitionGroup>  
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return({
        auth: state.auth,
        currentUser: state.auth.currentUser
    });
}

export default connect(mapStateToProps)(Task);