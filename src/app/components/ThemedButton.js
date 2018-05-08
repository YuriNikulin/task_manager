import { ThemeContext } from './context/ThemeContext.js';
import React from 'react';

const ThemedButton = (props) => {
    return(
        <ThemeContext.Consumer>
            {({theme, toggleTheme}) => {
            console.log(toggleTheme);
            return (
                <div className="button">
                    <button {...props} onClick={toggleTheme} className={'btn--'+ theme.name + ' ' + props.className} style={{}}>
                        {props.children}
                    </button>
                </div>
                )
            }
        }
        </ThemeContext.Consumer>
    )
}

export default ThemedButton