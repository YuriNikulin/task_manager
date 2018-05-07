import React from 'react';
import {observe} from './Game.js';
import Board from './Board.js';
import GridLayout from 'react-grid-layout';
import { statuses } from '../../constants/taskProperties.js';
import scrumProperties from '../../constants/scrumProperties.js';
console.log(scrumProperties);

class Container extends React.Component {
    constructor(props) {
        super(props);
    }

    handleDragStop = (layout, oldPos, newPos) => {
        console.log(oldPos, newPos);
    }

    handeLayoutChange = (layout) => {
        console.log(layout);
    }

    generateLayout = () => {
        let statusesObj = {};
        let statusesKeys = {};
        statuses.map((item, index) => {
            statusesObj[item] = {
                status: item,
                index: index,
                items: []
            }
            statusesKeys[index] = item;
        });

        let items = this.props.tasksList;
        let layoutObj = {};
        layoutObj.layoutDescr = [];
        layoutObj.layoutMarkup = [];
        items.map((item, index) =>  {
            statusesObj[item.taskStatus].items.push(item);
            // layoutObj.layoutDescr.push({
            //     i: item.taskId,
            //     x: index,
            //     y: 0,
            //     w: 1,
            //     h: 1
            // });
            // layoutObj.layoutMarkup.push(
            //     <div key={item.taskId}>
            //         {item.taskName}
            //     </div>
            // )
        })
        for (let i in statusesObj) {
            // console.log(statusesObj[i]);
            let currentStatus = statusesObj[i];
            layoutObj.layoutDescr.push({
                i: currentStatus.index + currentStatus.status,
                x: currentStatus.index,
                y: 0,
                w: 1,
                h: 1,
                isDraggable: false,
                static: true
            })
            layoutObj.layoutMarkup.push(
                <div className="tm-scrum-status" key={currentStatus.index + currentStatus.status}>
                    <span className="tm-scrum-status__status">{i}</span>
                </div>
            )
                
            let taskY = 1;
            for (let j = 0; j < currentStatus.items.length; j++) {
                let currentTask = currentStatus.items[j];
                layoutObj.layoutDescr.push({
                    i: currentTask.taskId,
                    x: currentStatus.index,
                    y: taskY,
                    w: 1,
                    h: 1,
                });

                layoutObj.layoutMarkup.push(
                    <div className="tm-scrum-task" key={currentTask.taskId}>
                        {currentTask.taskName}
                    </div>
                )
                
                taskY++;
            }
        }
        console.log(layoutObj);
        return layoutObj;
    }

    render() {
        let layoutObj = this.generateLayout();
        console.log(scrumProperties);

        return (
            <GridLayout className="tm-scrum-container"
                onDragStop={this.handleDragStop}
                onLayoutChange={this.handleLayoutChange}
                layout={layoutObj.layoutDescr}
                cols={8}
                containerPadding={scrumProperties.scrumContainerPadding}
                margin={scrumProperties.scrumGutter}
                rowHeight={scrumProperties.scrumItemHeight}
                width={scrumProperties.scrumContainerWidth}
                isResizable={false}>
                    {layoutObj.layoutMarkup}
            </GridLayout>
        )
      }
}

export default Container;