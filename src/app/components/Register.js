import React from 'react';
import { auth } from '../services/firebase';
import { db } from '../services/firebase/firebase.js'; 
import { connect } from 'react-redux';
import { Link, browserHistory, hashHistory } from 'react-router';
import Popup from './Popup.js';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            password2: '',
            error: false
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit = (event) => {
        if (this.state.password != this.state.password2) {
            this.setState({
                error: 'Passwords don\'t match'
            })
            return;
        }

        if (!this.state.password || !this.state.email || !this.state.username) {
            this.setState({
                error: 'All the fields are required'
            });
            return;
        }
        
        const {
            email, username
        } = this.state;
        auth.doCreateUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(authUser => {
                const uid = authUser.uid;
                this.props.router.push('/login');
                db.ref('users/' + authUser.uid + '/').set({
                    info: {email, username, uid},
                    tasks: {}
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    error: error.message
                })
            });

        event.preventDefault();    
    }

    render() {
        return(
            <Popup>
                <h2 className="tm__title tm-popup__title">Create an account</h2>
                <form>
                    <div className="tm-input-container">
                        <input className="tm-input" type="email" value={this.state.email} onChange={this.handleChange} id="email" placeholder="Email" />
                    </div>
                    <div className="tm-input-container">    
                        <input className="tm-input" type="text" value={this.state.username} onChange={this.handleChange} id="username" placeholder="Username" />
                    </div>
                    <div className="tm-input-container">    
                        <input className="tm-input" type="password" value={this.state.password} onChange={this.handleChange} id="password" placeholder="Password" />
                    </div>
                    <div className="tm-input-container">    
                        <input className="tm-input" type="password" value={this.state.password2} onChange={this.handleChange} id="password2" placeholder="Repeat password" />
                    </div>    
                    <button className="tm-btn tm-btn--primary mr " type="submit" onClick={this.handleSubmit}>Register</button>
                    <Link className="tm-btn tm-btn--text" to="/login">I already have an account</Link>
                    {this.state.error && 
                        <p className="tm__error">{this.state.error}</p>
                    }
                </form>
            </Popup>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

export default Register;