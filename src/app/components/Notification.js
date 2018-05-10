import React from 'react';
import { connect } from 'react-redux';
import actionRemoveNotification from '../redux/actions/removeNotification.js';

class Notification extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        setTimeout(() => {
            this.props.dispatch(actionRemoveNotification());
        }, this.props.duration || 5000)
    }
    render() {
        return (
            <div className="tm-notification">
                <div className="tm-notification-content">
                    {this.props.text}
                    {this.props.children &&
                        this.props.children
                    }
                </div>
            </div>
        )
    }
}

export default connect()(Notification);