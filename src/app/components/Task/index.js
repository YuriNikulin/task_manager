import React from 'react';
import { connect } from 'react-redux';
import { db } from '../../services/firebase/firebase.js';
import { firebase } from '../../services/firebase';
import { FirebaseComp } from '../../services/firebase/firebase.js';
import { browserHistory as history } from 'react-router';
import actionAuthAlternate from '../../redux/actions/authAlternate.js';
import * as taskProperties from '../../constants/taskProperties';
import Toolbar from '../Toolbar.js';
import Preloader from '../Preloader/Preloader.js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import actionPushNotification from '../../redux/actions/pushNotification.js';
import Input from '../Input.js';
import TaskForm from './TaskForm.js';
import Formsy from 'formsy-react';
import { Layout } from 'antd';
import Spin from '../Preloader/Spin.js';
const { Header, Footer, Content } = Layout;


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
                <Layout>
                    <Header>
                        <Toolbar listOfTasks={false}/>
                    </Header>
                    <Content>
                        <div className="tm-task">
                        {this.state.isLoaded 
                            ? 
                            <TaskForm data={this.state}/> 
                            :
                            <Spin className="centered"/>
                        }
                        
                        </div>
                    </Content>
                </Layout>
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