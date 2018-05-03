import React from 'react';
import { Link } from 'react-router';

const TasksGrid = (props) => {
    return (
        <div className="tm-grid">
            {props.tasksList.map((item) => {
                return (
                    <Link key={item.taskId} to={"/task" + item.taskId} className="tm-grid-item">
                        <div className="tm-grid-item-container tm-grid-item-name">
                            <span className="tm-grid-item__name">
                                <span className="tm-tasks__link">
                                    {item.taskName}
                                </span>    
                            </span>
                        </div>
                        <div className="tm-grid-item-container tm-grid-item-status">
                            Status:
                            <span className="tm-grid-item__status">
                                {item.taskStatus}
                            </span>
                        </div>
                        <div className="tm-grid-item-container tm-grid-item-priority">
                            Priority:
                            <span className="tm-grid-item__priority">
                                {item.taskPriority}
                            </span>
                        </div>
                    </Link>    
                )
            })}
        </div>
    )    
}

export default TasksGrid;