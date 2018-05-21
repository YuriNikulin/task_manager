import React from 'react';
import { db } from '../../services/firebase/firebase.js';
import { firebase } from '../../services/firebase';
import Toolbar from '../Toolbar.js';
import { connect } from 'react-redux';
import actionAuth from '../../redux/actions/auth.js';
import { FirebaseComp } from '../../services/firebase/firebase.js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { priorities } from '../../constants/taskProperties.js';
import actionPushNotification from '../../redux/actions/pushNotification.js';
import Input from '../Input.js';
import Formsy from 'formsy-react';
import { Layout } from 'antd';
import CreateTaskForm from './createTaskForm.js';
const { Header, Footer, Content } = Layout;

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

    handleSubmit(event, form) {
        let {taskName, taskDescription, taskPriority, estimatedTime} = event;

        if (!taskDescription) taskDescription = null;
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
                    form.resetFields();
                    this.props.dispatch(actionPushNotification({
                        text: `Task ${event.taskName} has been created`,
                        duration: 2000
                    }));

                    this.setState({
                        error: false
                    })
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

    handleInvalidSubmit = (data, foo, bar) => {
        this.setState({
            error: true
        })
    }

    render() {
        const {taskName, taskDescription, estimatedTime} = this.state;
        return(
            <div>
                <Layout>
                    <Header>
                        <Toolbar listOfTasks={false} currentLocation="createtask"/>
                    </Header>
                    <Content>
                        <div className="tm-create">
                            <div className="tm-create-content">
                                <CreateTaskForm error={this.state.error} handleSubmit={this.handleSubmit}/>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </div>        
        );
    }
}

export default connect()(CreateTask);
