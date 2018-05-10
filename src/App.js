import React from 'react';
import { connect } from 'react-redux';

import actionAuth from './app/redux/actions/auth.js';
import LogIn from './app/components/LogIn.js';
import { firebase } from './app/services/firebase';

import Preloader from './app/components/Preloader/Preloader.js';

import { syncHistoryWithStore } from 'react-router-redux';
import Home from './app/components/Home.js';
import Task from './app/components/Task.js';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Register from './app/components/Register.js';
import CreateTask from './app/components/CreateTask.js';

import Transition from 'react-transition-group/Transition';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import store from './app/redux';
import { FirebaseComp } from './app/services/firebase/firebase.js';

const history = browserHistory;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
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
    }

    componentWillReceiveProps() {
        this.setState({
            isLoaded: true
        })
    }

    render() {
        return(
            <div>
                <FirebaseComp />
                <ReactCSSTransitionGroup 
                    transitionName="fade"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                >
                    {!this.state.isLoaded 
                        ? 
                            <Preloader key="preloader" />
                        :
                            <div key="content" className="tm-container">
                                <Router history={browserHistory}>
                                    {routes}
                                </Router>
                            </div>
                    }
                </ReactCSSTransitionGroup> 
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
    }
}

export default connect(mapStateToProps)(App);