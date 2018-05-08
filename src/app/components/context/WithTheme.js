import React from 'react';
import { ThemeContext } from './ThemeContext.js';

const withTheme = (Component) => {
    return (props) => {
        return (
            <ThemeContext.Consumer>
                {theme => <Component {...props} theme={theme} />}
            </ThemeContext.Consumer>
        )
    }
}

export default withTheme;