import { DragDropContext } from 'react-dnd';
import { DragSource } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const boxSource = {
    beginDrag(props) {
        return {
            color: 'blue'
        }
    }
}

class Box extends React.Component {
    render() {
        return (
            connectDragSource(
                <div className="box">
                </div>
            )
        )
    }
}

export default DragSource('box', boxSource, connect => ({
    connectDragSource: connect.dragSource(),
}))(Box);