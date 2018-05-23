import React from 'react';
import { auth } from '../../services/firebase';
import { db } from '../../services/firebase/firebase.js'; 
import { connect } from 'react-redux';
import { Link, browserHistory as history } from 'react-router';
import { Modal } from 'antd';
import Formsy from 'formsy-react';
import Spin from '../Preloader/Spin.js';
import RegisterForm from './RegisterForm.js';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            password2: '',
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
        const {
            email, username, password
        } = event;
        this.setState({
            isLoading: true
        })
        auth.doCreateUserWithEmailAndPassword(email, password)
            .then(authUser => {
                const uid = authUser.uid;
                db.ref('users/' + authUser.uid + '/').set({
                    info: {email, username, uid},
                    tasks: {}
                });
                history.push('/login');
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
            <Modal
                visible={true}
                closable={false}
                title='Register'
                footer={null}>
                <RegisterForm error={this.state.error} handleSubmit={this.handleSubmit}/>
  
                {this.state.isLoading &&
                    <Spin overlay className="centered"/>
                }
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

export default Register;