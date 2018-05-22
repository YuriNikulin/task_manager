import React from 'react';
import GridLayout from 'react-grid-layout';
import { statuses } from '../../constants/taskProperties.js';
import scrumProperties from '../../constants/scrumProperties.js';
import { db } from '../../services/firebase/firebase.js';
import { connect } from 'react-redux';
import { message } from 'antd';
import actionPushNotification from '../../redux/actions/pushNotification.js';

class Container extends React.Component {
    constructor(props) {
        super(props);
    }

    handleDragStop = (layout, oldPos, newPos) => {
        if (oldPos.x == newPos.x) return;
        let newStatus = this.statusesKeys[newPos.x];

        let task = this.props.tasksList.find((item) => {
            return (item.taskId == newPos.i)
        });

        let taskId = task.taskId;
        let updates = {};
        let userId = this.props.currentUser.uid;
        updates['/users/' + userId + '/tasks/' + taskId + '/taskStatus'] = newStatus;
        db.ref().update(updates).then(() => {
            message.success(task.taskName + ' is now ' + newStatus);
            this.props.updateList();
        });
    }

    generateLayout = () => {
        this.statusesObj = {};
        this.statusesKeys = {};

        let statusesObj = this.statusesObj;
        let statusesKeys = this.statusesKeys;

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
        })
        for (let i in statusesObj) {
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
                    h: 2,
                });

                layoutObj.layoutMarkup.push(
                    <div className="tm-scrum-task" key={currentTask.taskId}>
                        {currentTask.taskName}
                    </div>
                )
                
                taskY++;
            }
        }
        return layoutObj;
    }

    render() {
        let layoutObj = this.generateLayout();

        return (
            <GridLayout 
                className="tm-scrum"
                onDragStop={this.handleDragStop}
                onLayoutChange={this.handleLayoutChange}
                layout={layoutObj.layoutDescr}
                cols={statuses.length}
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

const mapStateToProps = (store) => {
    return ({
        currentUser: store.auth.currentUser
    })
}

export default connect(mapStateToProps)(Container);