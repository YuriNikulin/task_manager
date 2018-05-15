import React from 'react';
import { connect } from 'react-redux';
import { auth } from '../../services/firebase';
import actionAuth from '../../redux/actions/auth.js';
import { Link, browserHistory as history } from 'react-router';
import LoginForm from './LoginForm.js';
import { Modal } from 'antd';
import Spin from '../Preloader/Spin.js';

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

    render() {
        return(
            <Modal 
                visible={true}
                closable={false}
                title='Sign in'
                footer={null}
                >
                <LoginForm error={this.state.error} handleSubmit={this.handleSubmit}/>
  
                {this.state.isLoading &&
                    <Spin overlay className="centered"/>
                }
            </Modal>
        )
    }
}

const mapStateToProps = (store) => {
    return ({
        auth: store.auth
    })
}

export default connect(mapStateToProps)(LogIn);
