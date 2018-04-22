import React from 'react';
import { Link } from 'react-router-dom';
import Toolbar from './Toolbar.js';
import ListOfTasks from './ListOfTasks.js';

import * as routes from './tools/routes';

import { db } from './firebase/firebase.js';

export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            tasksAppearance: 'shortList'
        }
    }
    render() {
        return (
            <ListOfTasks taskAppearance={this.state.taskAppearance} />
        )
    };
}