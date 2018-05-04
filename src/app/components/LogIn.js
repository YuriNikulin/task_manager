import React from 'react';
import { connect } from 'react-redux';
import { auth } from '../services/firebase';
import actionAuth from '../redux/actions/auth.js';
import LogOut from './LogOut.js';
import { Link, browserHistory, hashHistory } from 'react-router';
import Popup from './Popup.js';
import Preloader from './Preloader/Preloader.js';

class LogIn extends React.Component  {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: false,
            isLoading: false
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        auth.doSignInWithEmailAndPassword(this.state.email, this.state.password, this.props.onAuth).then(() => {
            this.setState({
                isLoading: true
            })
        }, (error) => {
            console.log(error);
            this.setState({
                error: error.message
            })
        });
    }

    componentDidUpdate() {
        if (this.props.auth.isLogged) {
            this.props.router.push('/');
        }
    }

    render() {
        return(
            <Popup>
                <h2 className="tm__title tm-popup__title"> Sign in </h2> 
                <form>
                    <div className="tm-input-container">
                        <input type="text" className="tm-input" value={this.state.email} onChange={this.handleChange} id="email" placeholder="Email" />
                    </div>
                    <div className="tm-input-container">    
                        <input type="password" className="tm-input" value={this.state.password} onChange={this.handleChange} id="password" placeholder="Password" />
                    </div>    
                    <button type="submit" className="tm-btn tm-btn--primary mr" onClick={this.handleSubmit}>Log in</button>
                    <Link className="tm-btn tm-btn--primary" to="/register">Create a new account</Link>
                    {this.state.error && 
                        <p className="tm__error">{this.state.error}</p>
                    }
                    {this.state.isLoading && <Preloader underlay={true} />}
                </form>
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
