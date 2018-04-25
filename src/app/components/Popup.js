import React from 'react';

export default class Popup extends React.Component {
    render() {
        return (
            <div>
                <div key={5} className="tm-popup">
                    {this.props.children}
                </div>
            </div>
        )
    }
}