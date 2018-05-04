import React from 'react';
import preloader from './preloader.gif';

const Preloader = (props) => {
    return (
        <div className={"tm-preloader " + (props.underlay && ' tm-preloader--underlay')}>
            <img src={preloader} />
        </div>
    )
}

export default Preloader;