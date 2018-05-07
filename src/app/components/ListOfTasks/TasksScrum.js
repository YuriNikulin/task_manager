import React from 'react';
import Knight from '../dnd/Knight.js';
import Square from '../dnd/Square.js';
import Board from '../dnd/Board.js';
import { observe } from '../dnd/Game.js';
import ReactDOM from 'react-dom';
import Container from '../dnd/Container.js';

class TasksScrum extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidUpdate() {

    }
    render() {
        return(
           <Container setNotification={this.props.setNotification} updateList={this.props.updateList} tasksList={this.props.tasksList}/>
        )
    }
}


export default TasksScrum;