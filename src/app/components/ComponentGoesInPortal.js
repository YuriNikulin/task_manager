import React from 'react';
import ReactDOM from 'react-dom';

const ComponentGoesInPortal = (props) => {
    return (
        ReactDOM.createPortal(
            props.children,
            document.querySelector('#root')
        )
    )
}

export default ComponentGoesInPortal;
