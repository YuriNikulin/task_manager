import React from 'react';
import Inline from './Inline.js';
import List from './List.js';
import WithTasks from './withTasks.js';
import WithTasksConnect from './withTasksConnect.js';
import HijElem from './hijElem.js';
import hijHoc from './hijHoc.js';
import Tasks from './Tasks.js';

class Hoc extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Inline top='kek'/>
                <List />
                <Tasks />
            </div>
        )
    }
}

export default Hoc;