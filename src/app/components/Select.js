import React from 'react';

const body = document.querySelector('body');

class Select extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shown: false,
            bodyListener: false,
            isTriggered: false
        }
    };

    handleClick = (event) => {
        if (this.state.isTriggered) return;

        this.setState({
            isTriggered: true
        });

        setTimeout(() => {
            this.setState({
                isTriggered: false
            })
        }, 100)

        if (!this.props.closeOnSelect) {
            let children = this.content.childNodes;
            for (var i = 0; i < children.length; i++) {
                if (event.target == children[i]) {
                    return;
                }
            }
        }

        if (this.state.shown) {
            this.close();
        } else {
            this.open();
        }
    };

    close = (event) => {
        body.removeEventListener('click', this.handleClick);
        this.setState({
            shown: false
        })
    }

    open = () => {
        body.addEventListener('click', this.handleClick);
        this.setState({
            shown: true
        })
    }

    render() {
        return(
            <div onClick={this.handleClick} className={"tm-select " + this.props.className + ' ' + (this.state.shown ? 'shown' : '')}>
                <span className="tm-select__title">
                    {this.props.title}
                </span>
                <div className="tm-select-content" ref={(elem) => { this.content = elem; }}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Select;