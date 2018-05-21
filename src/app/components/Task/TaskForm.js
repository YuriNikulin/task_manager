import React from 'react';
import { Form, Input, InputNumber, Icon, Button, Spin, Select } from 'antd';
import Buttons from './Buttons.js';
import * as taskProperties from '../../constants/taskProperties';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class TaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.data = this.props.data;
        this.state = {
            isChanging: false
        }
    }

    enableChangingMode = () => {
        this.setState({
            isChanging: true
        })
    }

    disableChangingMode = () => {
        this.props.form.resetFields();
        this.setState({
            isChanging: false
        })
    }

    handleChangeButtonClick = () => {
        if (!this.state.isChanging) {
            this.enableChangingMode();
        } else {
            this.disableChangingMode();
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.handleSubmit(values, this.props.form);
            }
        })
    }

    handleRemoveButtonClick = () => {
        this.props.handleRemoveButtonClick();
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, hasErrors } = this.props.form;
        const nameError = isFieldTouched('taskName') && getFieldError('taskName');
        console.log(this.props.data);

        return(
            <Form
                layout="vertical"
                onSubmit={this.handleSubmit}
                hideRequiredMark={true}>

                <div className="tm-task-header tm-task-container">
                    <FormItem
                        validateStatus={nameError ? 'error' : ''}
                        className="tm-task-title"
                        help={nameError || ''}>
                        {getFieldDecorator('taskName', {
                            initialValue: this.data.taskName,
                            rules: [
                                {
                                    required: true,
                                    message: 'Task name can not be empty!'
                                },
                                {
                                    type: 'string',
                                    whitespace: true,
                                    message: 'Task name can not consist of whitespaces only'
                                }
                            ]
                        })(
                            <Input disabled={!this.state.isChanging}/>
                        )}
                    </FormItem>
                    <span className="tm-task-date">
                        Created&nbsp; 
                        <span className="tm-task-date__date">
                            {new Date(this.data.taskCreationDate).toLocaleString()}
                        </span>
                    </span>
                    <Buttons
                        className="mb2"
                        isChanging={this.state.isChanging}
                        handleChangeButtonClick = {this.handleChangeButtonClick}
                        handleRemoveButtonClick = {this.handleRemoveButtonClick}
                    />
                </div>
                <div className="tm-task-info tm-task-container">
                    <div className="tm-task-info-item">
                        <FormItem
                            label="Status"
                        >                        
                            {getFieldDecorator('taskStatus', {
                                initialValue: this.data.taskStatus,
                            })(
                                <Select disabled={!this.state.isChanging}>
                                    {taskProperties.statuses.map((item) => {
                                        return (
                                            <Option key={item} value={item}>
                                                {item}
                                            </Option>
                                        )
                                    })}
                                </Select>
                            )}
                        </FormItem>
                    </div>

                    <div className="tm-task-info-item">
                        <FormItem
                            label="Priority"
                        >
                            {getFieldDecorator('taskPriority', {
                                initialValue: this.data.taskPriority
                            })(
                                <Select disabled={!this.state.isChanging}>
                                    {taskProperties.priorities.map((item) => {
                                        return (
                                            <Option key={item} value={item}>
                                                {item}
                                            </Option>
                                        )
                                    })}
                                </Select>
                            )}
                        </FormItem>
                    </div>
                </div>
                <div className="tm-task-time tm-task-container">
                    <div className="tm-task-time-item">
                        <FormItem
                            label="Estimated time"
                        >
                            {getFieldDecorator('estimatedTime', {
                                initialValue: this.data.estimatedTime,
                                rules: [
                                    {
                                        required: true,
                                        message: 'Estimated time can not be empty'
                                    }
                                ]
                            })(
                                <InputNumber disabled={!this.state.isChanging} min={0} placeholder="Estimated time" />
                            )}
                        </FormItem>
                    </div>
                    <div className="tm-task-time-item">
                        <FormItem
                            label="Log time"
                        >
                            {getFieldDecorator('loggedTime', {
                                initialValue: this.data.loggedTime,
                            })(
                                <InputNumber disabled={!this.state.isChanging} min={0} placeholder="Log time" />
                            )}
                        </FormItem>
                    </div>
                    <div className="tm-task-time-item">
                        <FormItem
                            label="Remaining time"
                        >
                            {getFieldDecorator('remainingTime', {
                                initialValue: this.data.remainingTime,
                            })(
                                <InputNumber disabled placeholder="Remaining time" />
                            )}
                        </FormItem>
                    </div>
                </div>
                <div className="tm-task-description tm-task-container">
                    <FormItem
                        label="Description"
                    >
                        {getFieldDecorator('taskDescription', {
                            initialValue: this.data.taskDescription
                        })(
                            <TextArea disabled={!this.state.isChanging}rows={4} />
                        )}
                    </FormItem>
                </div>
            </Form>
        )
    }
}

const WrappedTask = Form.create()(TaskForm);

export default WrappedTask;