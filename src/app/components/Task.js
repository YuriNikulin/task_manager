import React from 'react';
import { connect } from 'react-redux';
import { db } from '../services/firebase/firebase.js';
import { firebase } from '../services/firebase';

class Task extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
    }

    render() {
        console.log(this.props);
        return (
            <div>
                task 
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return({
        auth: state.auth
    });
}

export default connect(mapStateToProps)(Task);