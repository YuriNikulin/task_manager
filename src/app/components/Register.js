import React from 'react';
import { auth, db } from '../services/firebase';
import { connect } from 'react-redux';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            password2: '',
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit = (event) => {
        const {
            email, username
        } = this.state;
        auth.doCreateUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(authUser => {
                const uid = authUser.uid;
                this.props.router.push('/login');
                // db.ref('users/' + authUser.uid + '/').set({
                //     info: {email, username, uid},
                //     tasks: {}
                // });
            })
            .catch(error => {
                console.log(error);
            });

        event.preventDefault();    
    }

    render() {
        return(
            <div>
                <form>
                    <input type="email" value={this.state.email} onChange={this.handleChange} id="email" placeholder="email" />
                    <input type="text" value={this.state.username} onChange={this.handleChange} id="username" placeholder="username" />
                    <input type="password" value={this.state.password} onChange={this.handleChange} id="password" placeholder="password" />
                    <input type="password" value={this.state.password2} onChange={this.handleChange} id="password2" placeholder="repeat password" />
                    <button type="submit" onClick={this.handleSubmit}>Register</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

export default connect(mapStateToProps)(Register);