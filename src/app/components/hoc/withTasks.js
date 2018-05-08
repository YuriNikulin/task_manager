import React from 'react';
import { ThemeContext } from '../context/ThemeContext.js';

const withTasks = (Component) => {
    return class extends React.Component {
        constructor(props) { 
            super(props);
            this.state = {
                isTesting: true,
                foo: 'bar'
            }
        }

        render() {
            return <Component {...this.state} {...this.props}/>;
        }
    };
}

export default withTasks;