import React from 'react';

class Cat extends React.Component {
    render() {
        const mouse = this.props.mouse;
        console.log(this.props);
        return (
            <span style={{position: 'absolute', left: mouse.x, top: mouse.y}}>!!!</span>
        )
    }
}

class Mouse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 0,
            y: 0,
            foo: 'bar'
        }
    }

    handleMouseMove = (event) => {
        console.log(event);
        this.setState({
            x: event.clientX,
            y: event.clientY
        })
    }

    render() {
        return (
            <div style={{height: '300px'}} onMouseMove={this.handleMouseMove}>
                {this.props.render(this.state)}
            </div>
        )
    }
}

class MouseTracker extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Mouse render={mouse => (
                <Cat mouse={mouse} />
            )} />
        )
    }
}

export default MouseTracker;