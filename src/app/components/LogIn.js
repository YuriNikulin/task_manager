import React from 'react';
import { connect } from 'react-redux';
import { auth } from '../services/firebase';
import actionAuth from '../redux/actions/auth.js';
import LogOut from './LogOut.js';
import { Link, browserHistory as history } from 'react-router';
import Popup from './Popup.js';
import Preloader from './Preloader/Preloader.js';
import Input from './Input.js';
import Formsy from 'formsy-react';

class LogIn extends React.Component  {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: false,
            isLoading: false,
            toShowError: false
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit = (event) => {
        this.setState({
            isLoading: true
        })
        auth.doSignInWithEmailAndPassword(event.email, event.password, this.props.onAuth).then(() => {

        }, (error) => {
            console.log(error);
            this.setState({
                error: error.message,
                isLoading: false
            })
        });
    }

    componentDidUpdate() {
        if (this.props.auth.isLogged) {
            history.push('/');
        }
    }

    onValidSubmit = (data) => {
        console.log(data);
    }

    handleInvalidSubmit = (data) => {
        console.log(data);
        this.setState({
            toShowError: true
        })
    }

    render() {
        return(
            <Popup>
                <h2 className="tm__title tm-popup__title"> Sign in </h2> 
                <Formsy
                    ref={(form) => this.form = form}
                    onValidSubmit={this.handleSubmit} 
                    onInvalidSubmit={this.handleInvalidSubmit}
                >
                    <div className="tm-input-container">
                        <Input 
                            type="text"
                            name="email"
                            validations="isEmail"
                            validationError="Bad formatted email"
                            required
                            toShowError={this.state.toShowError}
                            attributes={{
                                className: "tm-input",  
                                id: "email",
                                placeholder: "Email"
                            }}/>
                    </div>
                    <div className="tm-input-container">    
                        <Input 
                            type="password"
                            name="password"
                            required
                            toShowError={this.state.toShowError}
                            attributes={{
                                className: "tm-input",  
                                id: "password", 
                                placeholder: "Password"
                            }}/>
                    </div>    
                    <button type="submit" className="tm-btn tm-btn--primary mr">Log in</button>
                    <Link className="tm-btn tm-btn--primary" to="/register">Create a new account</Link>
                    {this.state.error && 
                        <p className="tm__error">{this.state.error}</p>
                    }
                    {this.state.isLoading && <Preloader underlay={true} />}
                </Formsy>
            </Popup>
        )
    }
}

const mapStateToProps = (store) => {
    return ({
        auth: store.auth
    })
}

export default connect(mapStateToProps)(LogIn);
