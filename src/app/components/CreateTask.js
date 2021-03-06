import React from 'react';
import { db } from '../services/firebase/firebase.js';
import { firebase } from '../services/firebase';
import Toolbar from './Toolbar.js';
import { connect } from 'react-redux';
import actionAuth from '../redux/actions/auth.js';
import { FirebaseComp } from '../services/firebase/firebase.js';
import Notification from './Notification.js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { priorities } from '../constants/taskProperties.js';
console.log(priorities);

class CreateTask extends React.Component {
    constructor(props) {
            super(props);
            this.state = {
                taskName: '',
                taskDescription: '',
                taskPriority: 'Low',
                estimatedTime: '',
                currentUser: undefined,
                isLoading: true,
                error: false,
                createdTask: ''
            }
            this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        let {taskName, taskDescription, taskPriority, estimatedTime} = this.state;
        if (!taskName) {
            this.setState({
                error: 'Task name can not be empty'
            });
            return;
        }
        if (!estimatedTime) {
            this.setState({
                error: 'Estimated time can not be empty'
            })
            return;
        }

        estimatedTime = parseFloat(estimatedTime);
        const taskStatus = 'Open';
        const currentUser = firebase.auth.currentUser;
        let taskCreationDate = 0;
        db.ref('/.info/serverTimeOffset')
            .once('value')
            .then((data) => {
                taskCreationDate = new Date(data.val() + Date.now());
                const taskId = db.ref('users/' + currentUser.uid + '/tasks/').push().key;
                const remainingTime = estimatedTime;
                let updates = {};
                updates['/users/' + currentUser.uid + '/tasks/' + taskId] = {taskId, taskName, taskDescription, taskPriority, estimatedTime, remainingTime, taskStatus, taskCreationDate};
                db.ref().update(updates).then(() => {
                    this.setState({
                        taskName: '',
                        taskDescription: '',
                        estimatedTime: '',
                        createdTask: taskName
                    });
                });
        })
    }

    getServerTime = () => {
        db.ref('/.info/serverTimeOffset')
            .once('value')
            .then((data) => {
                return (data.val() + Date.now());
        })
    }

    closeNotification = () => {
        this.setState({
            createdTask: ''
        });
    }

    componentDidUpdate(prevProps, prevState) {
       
    }

    render() {
        const {taskName, taskDescription, estimatedTime} = this.state;
        return(
            <div>
                <Toolbar />
                <div className="tm-create">
                    <div className="tm-create-content">
                        <form onSubmit={this.handleSubmit}>
                            <div className="tm-input-container">
                                    <label className="tm-input__label">
                                            Enter the task name
                                    </label>
                                    <input 
                                            type="text"
                                            placeholder="Task name"
                                            className="tm-input"
                                            value={taskName} 
                                            onChange = {(event) => {this.setState({taskName: event.target.value})}}/>
                            </div>

                            <div className="tm-input-container">
                                    <label className="tm-input__label">
                                            Enter the estimated time (numeric value, in hours)
                                    </label>
                                    <input 
                                            type="text"
                                            placeholder="Estimated time (in hours)"
                                            className="tm-input"
                                            value={estimatedTime} 
                                            onChange = {(event) => {this.setState({estimatedTime: event.target.value})}}/>
                            </div> 

                            <div className="tm-input-container">
                                    <label className="tm-input__label">
                                            Enter a description for the task
                                    </label>
                                    <textarea 
                                            placeholder="Task description"
                                            value={taskDescription}
                                            className="tm-input tm-input--textarea"
                                            onChange = {(event) => {this.setState({taskDescription: event.target.value})}}>
                                    </textarea>
                            </div>        

                            <div className="tm-input-container">
                                    <label className="tm-input__label">
                                            Choose an initial priority for the task
                                    </label>
                                    <select className="tm-input tm-input--select" value={this.state.taskPriority} onChange = {(event) => {this.setState({taskPriority: event.target.value})}}>
                                            {priorities.map((item) => {
                                                return (
                                                    <option value={item}>
                                                        {item}
                                                    </option>
                                                )
                                            })}
                                    </select>        
                            </div>
                            {this.state.error && 
                                <p className="tm__error">{this.state.error}</p>
                            }
                            <div className="tac mt2">
                                    <button type="submit" className="tm-btn tm-btn--primary mt">Create</button>        
                            </div>
                        </form>
                    </div>
                </div>
                <ReactCSSTransitionGroup 
                    transitionName="notification"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                >
                    {this.state.createdTask && 
                        <Notification key="notifiction" duration={3000} closeNotification={this.closeNotification} text={'Task ' + this.state.createdTask + ' has been created'} />
                    }
                </ReactCSSTransitionGroup> 
            </div>        
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLogged: state.auth.isLogged
    }
}

export default CreateTask;
