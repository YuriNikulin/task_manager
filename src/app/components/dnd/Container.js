import React from 'react';
import { DropTarget } from 'react-dnd';

const boxTarget = {
    drop(targetProps, monitor) {
        return {
            box: monitor.getItem().color
        }
    }
}

export class Bin extends React.Component {
    render() {
        const { isOver, connectDropTarget } = this.props;
        return connectDropTarget(
            <div className="dnd-container">
                here
            </div>
        )
    }
}

export default DropTarget('box', boxTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
}))(Bin);