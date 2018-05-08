import React from 'react';

const FancyButton = React.forwardRef((props, ref) => {
    <button ref={ref} className="fancybutton">
        {props.children}
    </button>
})

const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>