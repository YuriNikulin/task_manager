import React from 'react';
import { db } from '../services/firebase/firebase.js';
import { firebase } from '../services/firebase';
import Toolbar from './Toolbar.js';
import { connect } from 'react-redux';
import actionAuth from '../redux/actions/auth.js';
import { FirebaseComp } from '../services/firebase/firebase.js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { priorities } from '../constants/taskProperties.js';
import actionPushNotification from '../redux/actions/pushNotification.js';
import Input from './Input.js';
import Formsy from 'formsy-react';

class CreateTask extends React.Component {
    constructor(props) {
            super(props);
            this.state = {
                currentUser: undefined,
                isLoading: true,
                error: false,
            }
            this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        let {taskName, taskDescription, taskPriority, estimatedTime} = event;

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
                    this.props.dispatch(actionPushNotification({
                        text: `Task ${this.state.taskName} has been created`,
                        duration: 2000
                    }));

                    this.form.reset();
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

    handleValid = () => {
        
    }

    handleInvalid = () => {
        
    }

    handleInvalidSubmit = (data, foo, bar) => {
        console.log('invalid', data);
        this.setState({
            error: true
        })
    }

    mapInputs() {

    }

    render() {
        const {taskName, taskDescription, estimatedTime} = this.state;
        return(
            <div>
                <Toolbar />
                <div className="tm-create">
                    <div className="tm-create-content">
                        <Formsy 
                            ref={(form) => this.form = form}
                            onValid={this.handleValid}  
                            onInvalid={this.handleInvalid} 
                            onValidSubmit={this.handleSubmit} 
                            onInvalidSubmit={this.handleInvalidSubmit}>

                                <Input 
                                    name="taskName"
                                    validations="minLength:1"
                                    validationError="Task name can not be empty"
                                    element='input'
                                    label='Name'
                                    toShowError={this.state.error}
                                    required
                                    attributes={{
                                        type: 'text',
                                        id: "taskName",
                                        placeholder: 'Name',
                                        className: 'tm-input',
                                    }}
                                />
                                <Input 
                                    name="estimatedTime"
                                    validations="isNumeric"
                                    validationError="Must be a number"
                                    element='input'
                                    label='Estimated time'
                                    toShowError={this.state.error}
                                    required
                                    attributes={{
                                        type: 'text',
                                        id: "estimatedTime",
                                        placeholder: 'Estimated time (in hours)',
                                        className: 'tm-input',
                                    }}
                                />

                                <Input 
                                    name="taskDescription"
                                    element='textarea'
                                    label='Description'
                                    value=''
                                    toShowError={this.state.error}
                                    attributes={{
                                        id: "taskDescription",
                                        placeholder: 'Task description',
                                        className: 'tm-input tm-input--textarea',
                                    }}
                                />

                                <Input
                                    name="taskPriority"
                                    element="select"
                                    label="Initial priority"
                                    value={priorities[0]}
                                    toShowError={this.state.error}
                                    attributes={{
                                        id: "taskPriority",
                                        className: 'tm-input tm-input--select'
                                    }}
                                >
                                    {priorities.map((item) => {
                                        return (
                                            <option key={item} value={item}>
                                                {item}
                                            </option>
                                        )
                                    })}
                                </Input>

                            {this.state.error && 
                                <p className="tm__error">{this.state.error}</p>
                            }
                            <div className="tac mt2">
                                <button type="submit" className="tm-btn tm-btn--primary mt">Create</button>        
                            </div>
                        </Formsy>
                    </div>
                </div>
            </div>        
        );
    }
}

export default connect()(CreateTask);
