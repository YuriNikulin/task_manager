import React from 'react';
import store from '../../redux';
import { connect } from 'redux';

const WithTasks = (Component) => {
    let reduxStore = store.getState();
    return class WithTasks extends React.Component {
        constructor(props) {
            super(props);
            this.state = store.getState();
            store.subscribe(() => {
                this.setState(store.getState());
            })
        }

        render() {
            return(
                <div>
                    <Component tasksView={this.state.tasks.tasksView}/>
                </div>
            )
        }
    }
}

export default WithTasks;