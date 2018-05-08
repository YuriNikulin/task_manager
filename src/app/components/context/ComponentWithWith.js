import React from 'react';
import withTheme from './WithTheme.js';

const ComponentWithWith = (props) => {
    console.log(props);
    return (
        <div className={props.theme.theme.name}>
            cww
        </div>
    )
}

export default withTheme(ComponentWithWith);