import React from 'react';

const FancyButton = React.forwardRef((props, ref) => {
        return(
            <button ref={ref} className="SS">
                {props.children}
            </button>
        )
    }
)

const Refs = () => {
    const ref = React.createRef();
    console.log(ref);
    return (
        <div>
            <FancyButton foo='bar' ref={ref}>Click!</FancyButton>
        </div>
    )
}

export default Refs;