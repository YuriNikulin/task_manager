import React from 'react';
import ReactDOM from 'react-dom';
import Container from '../dnd/Container.js';

class TasksScrum extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
           <Container setNotification={this.props.setNotification} updateList={this.props.updateList} tasksList={this.props.tasksList}/>
        )
    }
}


export default TasksScrum;