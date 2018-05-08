import React from 'react';
import ThemedButton from './ThemedButton.js';

const ThemedButtonGroup = (props) => {
    let buttons = [];
    for (let i = 0; i < props.count; i++) {
        buttons.push(
            <ThemedButton key={i}>
                Test
            </ThemedButton>
        )
    }
    return (
        <React.Fragment>
        {buttons}
        </React.Fragment>
    )
}

export default ThemedButtonGroup;