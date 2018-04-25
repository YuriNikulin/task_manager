import React from 'react';
import { connect } from 'react-redux';

class Task extends React.Component {
    constructor(props) {
        super(props);
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

export default Task;