import React from 'react';
import { db } from '../services/firebase/firebase.js';
import { firebase } from '../services/firebase';
import Toolbar from './Toolbar.js';
import { connect } from 'react-redux';
import actionAuth from '../redux/actions/auth.js';
import { FirebaseComp } from '../services/firebase/firebase.js';

class CreateTask extends React.Component {
    constructor(props) {
            super(props);
            this.state = {
                taskName: '',
                taskDescription: '',
                taskPriority: 'Low',
                estimatedTime: '',
                currentUser: undefined,
                isLoading: true
            }
            this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const {taskName, taskDescription, taskPriority, estimatedTime} = this.state;
        const taskStatus = 'Open';
        const currentUser = firebase.auth.currentUser;
        let taskCreationDate = 0;
        db.ref('/.info/serverTimeOffset')
            .once('value')
            .then((data) => {
                taskCreationDate = new Date(data.val() + Date.now()).toLocaleString();
                const taskId = db.ref('users/' + currentUser.uid + '/tasks/').push().key;
                let updates = {};
                updates['/users/' + currentUser.uid + '/tasks/' + taskId] = {taskId, taskName, taskDescription, taskPriority, estimatedTime, taskStatus, taskCreationDate};
                db.ref().update(updates);
        })

        this.setState({
            taskName: '',
            taskDescription: '',
            estimatedTime: ''
        });
    }

    getServerTime = () => {
        db.ref('/.info/serverTimeOffset')
            .once('value')
            .then((data) => {
                return (data.val() + Date.now());
        })
    }

    componentDidMount() {
        this.props.onAuth();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.auth.currentUser !== this.props.auth.currentUser) {
            this.setState({
                currentUser: this.props.auth.currentUser,
                isLoading: false
            })
        }
        if (this.state.currentUser === null && !this.state.isLoading) {
             this.props.router.push('/login');
        }
    }

    render() {
        const {taskName, taskDescription, estimatedTime} = this.state;
        return(
            <div>
                <Toolbar />
                <FirebaseComp func={this.props.onAuth} />
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
                                            <option value="Critical">
                                                    Critical
                                            </option>
                                            <option value="High">
                                                    High
                                            </option>
                                            <option value="Medium">
                                                    Medium
                                            </option>
                                            <option value="Minor">
                                                    Minor
                                            </option>
                                            <option value="Low">
                                                    Low
                                            </option>
                                    </select>        
                            </div>
                            <div className="tac mt2">
                                    <button type="submit" className="tm-btn tm-btn--primary mt">Create</button>        
                            </div>
                        </form>
                    </div>
                </div>
            </div>        
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLogged: state.auth.isLogged
    }
}

export default connect(
        (state, ownProps) => ({
            items: state.track.filter(item => item.name.includes(state.filter)),
            auth: state.auth,
            isLogged: state.auth.isLogged
        }),
        dispatch => ({
            onAuth: () => {
                dispatch(actionAuth());
            }
        })
)(CreateTask);