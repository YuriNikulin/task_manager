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

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, hasErrors } = this.props.form;
        const nameError = isFieldTouched('taskName') && getFieldError('taskName');
        console.log(this.props.data);

        return(
            <Form
                layout="vertical"
                onSubmit={this.handleSubmit}>

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
                            <Input disabled/>
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
                    />
                </div>
                <div className="tm-task-info tm-task-container">
                    <div className="tm-task-info-item">
                        <FormItem
                            label="Status"
                            labelCol={{sm: {span: 5}}}
                            wrapperCol={{sm: {span: 19}}}
                        >                        
                            {getFieldDecorator('taskStatus', {
                                initialValue: this.data.taskStatus,
                            })(
                                <Select>
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
                </div>
            </Form>
        )
    }
}

const WrappedTask = Form.create()(TaskForm);

export default WrappedTask;