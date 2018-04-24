import React from 'react';
import { connect } from 'react-redux';
import { auth } from '../services/firebase';
import actionAuth from '../redux/actions/auth.js';

class LogIn extends React.Component  {
    state = {
        username: '',
        password: ''
    };

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
                    <button type="" onClick={this.handleLogOff}>Log off</button>
                </form>
            </div>
        )
    }
}

export default connect(
    (state, ownProps) => ({
        state: state
    }),
    dispatch => ({
        onAuth: () => {
            dispatch(actionAuth());
        }
    })
)(LogIn);