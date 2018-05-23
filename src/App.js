import React from 'react';
import { connect } from 'react-redux';

import actionAuth from './app/redux/actions/auth.js';
import { firebase } from './app/services/firebase';

import Spin from './app/components/Preloader/Spin.js';

import { syncHistoryWithStore } from 'react-router-redux';
import Home from './app/components/Home.js';
import Task from './app/components/Task/';
import LogIn from './app/components/Login';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Register from './app/components/Register/';
import CreateTask from './app/components/CreateTask/';

import Transition from 'react-transition-group/Transition';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import store from './app/redux';
import { FirebaseComp } from './app/services/firebase/firebase.js';
import { Layout } from 'antd';

const history = browserHistory;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            notification: false
        }
    }

    componentDidMount() {
        history.listen(this.checkAuthOnTransitions);
    }

    checkAuthOnTransitions = () => {
        let curLoc = history.getCurrentLocation().pathname;
        if ((!this.props.auth.isLogged && this.state.isLoaded) && (curLoc != '/login') && (curLoc != '/register')) {
            history.push('/login');
        }
    }

    componentDidUpdate() {
        if (!this.props.auth.isLogged) {
            history.push('/login');
        }
        this.handleNotifications();
    }

    handleNotifications = () => {
        let notification = this.props.notifications[0]
    }

    componentWillReceiveProps() {
        this.setState({
            isLoaded: true
        })

    }

    closeNotification = () => {

    }

    render() {
        return(
            <div>
                <FirebaseComp />
                {!this.state.isLoaded 
                    ? 
                        <Spin className="centered" key="preloader" />
                    :
                        <div key="content" className="tm-container">
                            <Router history={browserHistory}>
                                {routes}
                            </Router>
                        </div>
                }
            </div> 
        )
    }
}

const routes = (
    <React.Fragment>
        <Route path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/createtask" component={CreateTask} />
        <Route path="/task:id" component={Task} />
        <Route path="/login" component={LogIn} />
    </React.Fragment>    
)

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        notifications: state.notifications
    }
}

export default connect(mapStateToProps)(App);