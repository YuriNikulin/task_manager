import React from 'react';
import { connect } from 'react-redux';
import { db } from '../services/firebase/firebase.js';
import { firebase } from '../services/firebase';
import { FirebaseComp } from '../services/firebase/firebase.js';
import actionAuthAlternate from '../redux/actions/authAlternate.js';
import * as taskProperties from '../constants/taskProperties';
import Toolbar from './Toolbar.js';

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
            taskStatus: ''

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
        this.props;

        const userId = user.uid;
        db.ref('/users/' + userId + '/tasks/' + this.props.params.id).once('value').then((snapshot) => {
            let task = (snapshot.val());
            if (!task) return;
            this.setState({
                ...task,
                isLoaded: true
            });
        });
    }

    onAuth = () => 
        this.props.dispatch(actionAuthAlternate());

    toggleChangingMode = () => {
        console.log(this.state);
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
            this.props.router.push('/');
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
        db.ref().update(updates);
        this.setState({
            isChanging: false,
            isLoaded: false,
            loggedTime: ''
        });
        this.maybeFetchTask();
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    render() {
        return (
            <div>
                <FirebaseComp func={this.onAuth}/>
                <Toolbar />
                <div className="tm-task">
                    <form>
                        <div className="tm-task-header">
                            <input disabled={!this.state.isChanging} type="text" onChange={this.handleChange} value={this.state.taskName} id="taskName" className="tm-task-input tm-task__title" />
                            <span className="tm-task-date">
                                Created 
                                <span className="tm-task-date__date">
                                    {this.state.taskCreationDate}
                                </span>
                            </span>
                            <a onClick={this.toggleChangingMode} className="tm-btn--primary tm-btn tm-task-header__button mr">
                                {this.state.isChanging ? 'Cancel' : 'Edit'}
                            </a>
                            <a onClick = {this.handleRemove} className="tm-btn--warning tm-btn tm-task-header__button">
                                Delete task
                            </a>
                        </div>
                        <div className="tm-task-info">
                            <div className="tm-task-info-item tm-task-status">
                                <select disabled={!this.state.isChanging} onChange={this.handleChange} value={this.state.taskPriority} id="taskStatus" className="tm-task-select">
                                    {taskProperties.statuses.map((item) => 
                                        <option key={item} value={item}>
                                            {item}
                                        </option>    
                                    )}
                                </select>
                            </div>

                            <div className="tm-task-info-item tm-task-status">
                                <select disabled={!this.state.isChanging} onChange={this.handleChange} value={this.state.taskPriority} id="taskPriority" className="tm-task-select">
                                    {taskProperties.priorities.map((item) => 
                                    <option key={item} value={item}>
                                            {item}
                                    </option>    
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className='tm-task-estimated'>
                            <div className="tm-task-estimated-item">
                                <input disabled={!this.state.isChanging} onChange={this.handleChange} type="number" id="estimatedTime" value={this.state.estimatedTime} className="tm-task-input tm-task-estimated__input" />
                            </div>
                            <div className="tm-task-estimated-item">
                                <input disabled={!this.state.isChanging} onChange={this.handleChange} type="number" id="loggedTime" value={this.state.loggedTime} className="tm-task-input tm-task-estimated__input" />
                            </div>
                            <div className="tm-task-estimated-item">
                                <input disabled={true} type="number" value={this.state.remainingTime} className="tm-task-input tm-task-estimated__input" />
                            </div>
                        </div>
                        <div className="tm-task-description">
                            <div className="tm-task-description-item">
                                <textarea disabled={!this.state.isChanging} id="taskDescription" onChange={this.handleChange} className="tm-task-input tm-task-description__input" value={this.state.taskDescription}>
                                </textarea>
                            </div>
                        </div>
                        <div className="tm-task-footer">
                            <a onClick={this.handleSave} className="tm-btn tm-btn--primary">
                                Save changes
                            </a>
                        </div>
                    </form>
                </div> 
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