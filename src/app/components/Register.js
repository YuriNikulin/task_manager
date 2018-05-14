import React from 'react';
import { auth } from '../services/firebase';
import { db } from '../services/firebase/firebase.js'; 
import { connect } from 'react-redux';
import { Link, browserHistory as history } from 'react-router';
import Popup from './Popup.js';
import Input from './Input.js';
import Formsy from 'formsy-react';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            password2: '',
            error: false,
            toShowError: false
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit = (event) => {
        const {
            email, username, password
        } = event;
        auth.doCreateUserWithEmailAndPassword(email, password)
            .then(authUser => {
                const uid = authUser.uid;
                history.push('/login');
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
    }

    handleInvalidSubmit = (event) => {
        console.log(event);
        this.setState({
            toShowError: true
        })
    }

    render() {
        return(
            <Popup>
                <h2 className="tm__title tm-popup__title">Create an account</h2>
                <Formsy
                    ref={(form) => this.form = form}
                    onValidSubmit={this.handleSubmit} 
                    onInvalidSubmit={this.handleInvalidSubmit}
                >
                    <div className="tm-input-container">
                        <Input   
                            type="email"
                            name="email" 
                            validations="isEmail"
                            validationError="Bad formatted email"
                            required
                            toShowError={this.state.toShowError}
                            attributes={{
                                id: "email", 
                                placeholder: "Email",
                                className: "tm-input"
                            }}/>
                    </div>
                    <div className="tm-input-container">    
                        <Input 
                            type="text" 
                            name="username"
                            required
                            toShowError={this.state.toShowError}
                            attributes={{
                                id: "username",
                                placeholder: "Username",
                                className: "tm-input"
                            }} />
                    </div>
                    <div className="tm-input-container">    
                        <Input 
                            type="password" 
                            name="password"
                            required
                            toShowError={this.state.toShowError}
                            attributes={{
                                id: "password", 
                                placeholder: "Password", 
                                className: "tm-input",
                                type: "password"
                            }}/>
                    </div>
                    <div className="tm-input-container">    
                        <Input 
                            type="password" 
                            name="password2"
                            required
                            validations="equalsField:password"
                            validationError="Passwords don't match"
                            toShowError={this.state.toShowError}
                            attributes={{
                                id: "password2", 
                                placeholder: "Repeat password", 
                                className: "tm-input",
                                type: "password"
                            }}/>
                    </div>    
                    <button className="tm-btn tm-btn--primary mr " type="submit">Register</button>
                    <Link className="tm-btn tm-btn--text" to="/login">I already have an account</Link>
                    {this.state.error && 
                        <p className="tm__error">{this.state.error}</p>
                    }
                </Formsy>
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