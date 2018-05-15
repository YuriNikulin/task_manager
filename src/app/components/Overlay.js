import React from 'react';

const Overlay = (props) => {
    return(
        <div className="tm-overlay">
            {props.children}
        </div>
    )
}

export default Overlay;