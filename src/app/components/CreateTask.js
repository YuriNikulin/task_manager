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
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type="text"
                        placeholder="Task name"
                        value={taskName} 
                        onChange = {(event) => {this.setState({taskName: event.target.value})}}/>

                    <textarea 
                        placeholder="Task description"
                        value={taskDescription} 
                        onChange = {(event) => {this.setState({taskDescription: event.target.value})}}>
                    </textarea>    

                    <input 
                        type="text"
                        placeholder="Estimated time (in hours)"
                        value={estimatedTime} 
                        onChange = {(event) => {this.setState({estimatedTime: event.target.value})}}/>

                    <select onChange = {(event) => {this.setState({taskPriority: event.target.value})}}>
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

                    <button type="submit" className="tm-btn tm-btn--primary">Create</button>    
                </form>
            </div>
        );
    }
}

export default CreateTask;