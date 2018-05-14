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
import Input from './Input.js';
import Formsy from 'formsy-react';


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
            this.initState = (snapshot.val());

            if (!this.initState) return;
            if (this.initState.remainingTime === '') {
                this.initState.remainingTime = this.initState.estimatedTime;
            }
            this.setState({
                ...this.initState,
                isLoaded: true,
                loggedTime: ''
            });
        });
    }

    onAuth = () => 
        this.props.dispatch(actionAuthAlternate());

    toggleChangingMode = () => {
        if (!this.state.isChanging) {
            this.enableChangingMode();
        } else {
            this.disableChangingMode();
        }
    }

    enableChangingMode = () => {
        this.setState({
            isChanging: true
        })
    }

    disableChangingMode = () => {
        this.setState({
            isChanging: false,
            ...this.initState
        })
        this.form.reset();
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

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit = (event) => {
        let {taskName, taskDescription, taskPriority, estimatedTime, loggedTime, remainingTime, taskStatus} = event;
        let {taskId, taskCreationDate} = this.state;

        if (estimatedTime < remainingTime) remainingTime = estimatedTime;

        if (Number(loggedTime)) {
            remainingTime = remainingTime - loggedTime;
        }

        if (remainingTime < 0) remainingTime = 0;

        const user = this.props.currentUser;
        const userId = user.uid;
        let updates = {};

        updates['/users/' + user.uid + '/tasks/' + this.props.params.id] = {taskId, taskName, taskDescription, taskPriority, estimatedTime, remainingTime, taskStatus, taskCreationDate};
        db.ref().update(updates).then(() => {
            this.setState({
                isChanging: false,
                isLoaded: false,
                loggedTime: '',
            });
            this.loggedTime.setValue('');
            this.props.dispatch(actionPushNotification({text: 'The task has been updated', duration: 3000}));
            this.maybeFetchTask();
        });
    }

    handleInvalidSubmit = (event) => {
        console.log('invalid', event);
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
                                <Formsy
                                    ref={(form) => this.form = form}
                                    onValid={this.handleValid}  
                                    onInvalid={this.handleInvalid} 
                                    onValidSubmit={this.handleSubmit} 
                                    onInvalidSubmit={this.handleInvalidSubmit}>
                                    <div className="tm-task-header tm-task-container">
                                        <Input 
                                            name="taskName" 
                                            type="text"
                                            validationError="Task name can not be empty"
                                            onChange={this.handleChange}
                                            required
                                            value={this.state.taskName}
                                            toShowError={true}
                                            attributes={{
                                                id: "taskName",
                                                className: "tm-task-input tm-task__title",
                                                disabled: !this.state.isChanging
                                            }}
                                        />
                                            
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
                                            <label htmlFor='taskStatus' className="tm-task__label">
                                                Status
                                            </label>
                                            <Input 
                                                element='select'
                                                name='taskStatus'
                                                value={this.state.taskStatus} 
                                                attributes={{
                                                    id: "taskStatus", 
                                                    className: "tm-task-select",
                                                    disabled: !this.state.isChanging 
                                                }}>

                                                {taskProperties.statuses.map((item) => 
                                                    <option key={item} value={item}>
                                                        {item}
                                                    </option>    
                                                )}
                                            </Input>
                                        </div>

                                        <div className="tm-task-info-item tm-task-status">
                                            <label htmlFor='taskPriority' className="tm-task__label">
                                                Priority
                                            </label>
                                            <Input 
                                                element='select'
                                                name='taskPriority'
                                                value={this.state.taskPriority} 
                                                attributes={{
                                                    id: "taskPriority", 
                                                    className: "tm-task-select",
                                                    disabled: !this.state.isChanging 
                                                }}>

                                                {taskProperties.priorities.map((item) => 
                                                    <option key={item} value={item}>
                                                        {item}
                                                    </option>    
                                                )}
                                            </Input>
                                        </div>
                                    </div>
                                    <div className='tm-task-estimated tm-task-container'>
                                        <div className="tm-task-estimated-item">
                                            <label htmlFor="estimatedTime" className="tm-task__label">
                                                Estimated time
                                            </label>
                                            <Input 
                                                name='estimatedTime'
                                                value={this.state.estimatedTime}
                                                validations="isNumeric"
                                                validationError="Must be a number"
                                                toShowError={true}
                                                attributes={{
                                                    className: "tm-task-input tm-task-estimated__input",
                                                    id: "estimatedTime",
                                                    disabled: !this.state.isChanging
                                                }}/>
                                        </div>
                                        <div className="tm-task-estimated-item">
                                            <label htmlFor="loggedTime" className="tm-task__label">
                                                Log time
                                            </label>
                                            <Input 
                                                name='loggedTime'
                                                value={this.state.loggedTime}
                                                ref={(elem) => this.loggedTime=elem}
                                                validations="isNumeric"
                                                validationError="Must be a number"
                                                toShowError={true}
                                                attributes={{
                                                    id: "loggedTime",
                                                    className: "tm-task-input tm-task-estimated__input",
                                                    disabled: !this.state.isChanging
                                                }}/>
                                        </div>
                                        <div className="tm-task-estimated-item">
                                            <label htmlFor="remainingTime" className="tm-task__label">
                                                Remaining time
                                            </label>    
                                            <Input  
                                                value={this.state.remainingTime || '0'} 
                                                name='remainingTime'
                                                attributes={{
                                                    id: "remainingTime",
                                                    className: "tm-task-input tm-task-estimated__input",
                                                    disabled: true
                                                }}/>
                                        </div>
                                    </div>
                                    <div className="tm-task-description tm-task-container">
                                        <div className="tm-task-description-item">
                                            <label htmlFor="taskDescription" className="tm-task__label">
                                                Task description
                                            </label>    
                                            <Input
                                                value={this.state.taskDescription}
                                                name='taskDescription'
                                                element='textarea'
                                                attributes={{
                                                    id: "taskDescription",
                                                    className: "tm-task-input tm-task-description__input", 
                                                    disabled: !this.state.isChanging 
                                                }}/>
                                        </div>
                                    </div>
                                    <div className="tm-task-footer tm-task-container">
                                        <button 
                                            type="submit"  
                                            disabled={!this.state.isChanging} 
                                            className={"tm-btn tm-btn--primary" + (!this.state.isChanging ? ' tm-btn--disabled' : '')}>
                                            Save changes
                                        </button>
                                    </div>
                                </Formsy>
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