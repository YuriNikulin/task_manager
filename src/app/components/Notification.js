import React from 'react';

class Notification extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        setTimeout(() => {
            this.props.closeNotification();
        }, this.props.duration || 5000)
    }
    render() {
        return (
            <div className="tm-notification">
                <div className="tm-notification-conent">
                    {this.props.text}
                    {this.props.children &&
                        this.props.children
                    }
                </div>
            </div>
        )
    }
}

export default Notification;