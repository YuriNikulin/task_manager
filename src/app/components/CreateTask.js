import React from 'react';
import { db } from './firebase/firebase.js';
import { firebase } from './firebase';

class CreateTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taskName: '',
            taskDescription: '',
            estimatedTime: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        const {taskName, taskDescription, taskPriority, estimatedTime} = this.state;
        const taskStatus = 'Open';
        const currentUser = firebase.auth.currentUser;
        console.log(currentUser);
        this.setState({
            taskName: '',
            taskDescription: '',
            estimatedTime: ''
        });
        const taskId = db.ref('users/' + currentUser.uid + '/tasks/').push().key;
        let updates = {};
        updates['/users/' + currentUser.uid + '/tasks/' + taskId] = {taskId, taskName, taskDescription, taskPriority, estimatedTime, taskStatus};
        db.ref().update(updates);
        event.preventDefault();
    }
    render() {
        const {taskName, taskDescription, estimatedTime} = this.state;
        return(
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
                            <select className="tm-input tm-input--select" onChange = {(event) => {this.setState({taskPriority: event.target.value})}}>
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
        );
    }
}

export default CreateTask;