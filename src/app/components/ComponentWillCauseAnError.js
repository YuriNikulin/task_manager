import React from 'react';

class ComponentWillCauseAnError extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="">
                some component
                {this.props.user.name}
            </div>
        )
    }
}

export default ComponentWillCauseAnError;