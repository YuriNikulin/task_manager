import React from 'react';
import preloader from './preloader.gif';

console.log(preloader);

const Preloader = () => {
    return (
        <div className="tm-preloader">
            <img src={preloader} />
        </div>
    )
}

export default Preloader;