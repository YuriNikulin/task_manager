import React from 'react';
import { NavLink, withRouter, } from 'react-router-dom';

import * as routes from './tools/routes';

const CreateTaskButton = (props) => {
    return (
        <NavLink exact to="/createtask"className={"tm__create " + props.className}>Create a task</NavLink>
    )
}

export default withRouter(CreateTaskButton);