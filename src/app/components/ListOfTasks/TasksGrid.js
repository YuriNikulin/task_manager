import React from 'react';
import { Link } from 'react-router';
import { Card, Col, Row } from 'antd';

const TasksGrid = (props) => {
    return (
        <div className="tm-grid">
            <Row gutter={10}>
                {props.tasksList.map((item) => {
                    return (
                        <Col key={item.taskId} xl={6} lg={8} md={12} sm={24}>
                            <Card title={item.taskName} className="tm-grid-item">
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
                                <Link className="tm-grid-item__overlay" to={`/task${item.taskId}`} />
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </div>
    )    
}

export default TasksGrid;