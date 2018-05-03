import React from 'react';
import { Link } from 'react-router';

const TasksList = (props) => {
    return (
        <div className="tm-table-container">
            <table className="tm-table tm-tasks-table">
                <thead>
                    <tr>
                        <td>
                            <span>
                                Name
                            </span>
                        </td>
                        <td>
                            <span>
                                Status
                            </span>
                        </td>
                        <td>
                            <span>
                                Priority
                            </span>
                        </td>
                        <td>
                            <span>
                                Estimated
                            </span>
                        </td>
                        <td>
                            <span>
                                Remaining
                            </span>
                        </td>
                        <td>
                            <span>
                                Created
                            </span>
                        </td>
                    </tr>
                </thead>
                <tbody>
                
                {props.tasksList.map((item) => {
                    return (
                        <tr key={item.taskId} className="tm-tasks-item">
                            <td>
                                <span className="tm-tasks-item__name">
                                    <Link className="tm-tasks__link" to={"/task" + item.taskId}>
                                        {item.taskName}
                                    </Link>    
                                </span>
                            </td>
                            <td>
                                <span className="tm-tasks-item__status">
                                    {item.taskStatus}
                                </span>
                            </td>
                            <td>
                                <span>
                                    {item.taskPriority}
                                </span>
                            </td>
                            <td>
                                <span>
                                    {item.estimatedTime}
                                </span>
                            </td>
                            <td>
                                <span>
                                    {item.remainingTime}
                                </span>
                            </td>
                            <td>
                                <span>
                                    {item.taskCreationDate}
                                </span>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}

export default TasksList;