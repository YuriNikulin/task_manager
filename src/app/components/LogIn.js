import React from 'react';
import { connect } from 'react-redux';
import { auth } from '../services/firebase';
import actionAuth from '../redux/actions/auth.js';
import LogOut from './LogOut.js';
import { Link, browserHistory, hashHistory } from 'react-router';

class LogIn extends React.Component  {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    componentDidUpdate() {
        if (this.props.isLogged) {
            this.props.router.push('/');
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleTest = () => {
        console.log('poprobuem');
    }

    handleSubmit = (event) => {
        console.log(this.props);
        event.preventDefault();
        auth.doSignInWithEmailAndPassword(this.state.username, this.state.password, this.props.onAuth);
    }

    handleLogOff = (event) => {
        event.preventDefault();
        auth.doSignOut();
    }

    render() {
        return(
            <div>
                <form>
                    <input type="text" value={this.state.username} onChange={this.handleChange} id="username" placeholder="username" />
                    <input type="text" value={this.state.password} onChange={this.handleChange} id="password" placeholder="password" />
                    <button type="submit" onClick={this.handleSubmit}>Log in</button>
                    <Link to="/register">Create a new account</Link>
                </form>
            </div>
        )
    }
}

export default connect(
    (state, ownProps) => ({
        state: state,
        isLogged: state.auth.isLogged
    }),
    dispatch => ({
        onAuth: () => {
            dispatch(actionAuth());
        }
    })
)(LogIn);