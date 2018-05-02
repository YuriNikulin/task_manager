import React from 'react';
import { connect } from 'react-redux';


import getTracks from './app/redux/actions/track.js';
import actionAuth from './app/redux/actions/auth.js';
import LogIn from './app/components/LogIn.js';
import { firebase } from './app/services/firebase';

import Preloader from './app/components/Preloader/Preloader.js';

import Authorization from './app/components/Authorization.js';
import { syncHistoryWithStore } from 'react-router-redux';
import Home from './app/components/Home.js';
import Task from './app/components/Task.js';

import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Register from './app/components/Register.js';
import ProtectedRoute from './app/components/ProtectedRoute.js';
import CreateTask from './app/components/CreateTask.js';

import store from './app/redux';
import { FirebaseComp } from './app/services/firebase/firebase.js';

const testFunc = () => {
    console.log('test');
    return;
}

const history = syncHistoryWithStore(hashHistory, store);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
        }
    }

    componentDidMount() {
        
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
                {!this.state.isLoaded 
                    ? 
                    <Preloader />
                    :
                    <div className="tm-container">
                        <Router history={history}>
                            {routes}
                        </Router>
                    </div>
                }
            </div> 
        )
    }
}

const routes = (
    <div>
        <Route path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/createtask" component={CreateTask} />
        <Route path="/task:id" component={Task} />
        <Route path="/login" component={LogIn} />
    </div>    
)

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(App);