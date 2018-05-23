import { ThemeContext } from './context/ThemeContext.js';
import React from 'react';

const ThemedButton = (props) => {
    return(
        <ThemeContext.Consumer>
            {({theme, toggleTheme, foo}) => {
            console.log(foo);
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