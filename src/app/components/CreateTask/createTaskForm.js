import React from 'react';
import { Form, Input, InputNumber, Icon, Button, Spin, Select } from 'antd';
import { Link } from 'react-router';
import { priorities } from '../../constants/taskProperties.js';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

const hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class createTaskForm extends React.Component {
    constructor(props) {
        super(props);
    }

    isNum = (rule, value, callback) => {
        if (!Number(value)) callback('Must be a number!');
        callback();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.handleSubmit(values, this.props.form);
            }
        })
    }
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, hasErrors } = this.props.form;
        const nameError = isFieldTouched('taskName') && getFieldError('taskName');
        const estimatedError = isFieldTouched('estimatedTime') && getFieldError('estimatedTime');
        return (
            <Form 
                layout="vertical"
                onSubmit={this.handleSubmit}>
                <FormItem 
                    validateStatus={nameError ? 'error' : ''}
                    help={nameError || ''}
                    label="Name"
                    labelCol={{sm: {span: 5}}}
                    wrapperCol={{sm: {span: 19}}}>
                    
                    {getFieldDecorator('taskName', {
                        rules: [
                        {
                            required: true,
                            message: 'Please input task name!'
                        },
                        {
                            type: 'string',
                            whitespace: true,
                            message: 'Task name can not consist of whitespaces only'
                        }
                        ]
                    })(
                        <Input placeholder="Task name" />
                    )}
                </FormItem>
                <FormItem 
                    validateStatus={estimatedError ? 'error' : ''}
                    help={estimatedError || ''}
                    label="Estimated"
                    labelCol={{sm: {span: 5}}}
                    wrapperCol={{sm: {span: 19}}}>
                    
                    {getFieldDecorator('estimatedTime', {
                        rules: [
                        {
                            required: true,
                            message: 'Please input estimated time!'
                        },
                        {
                            validator: this.isNum
                        },
                        ]
                    })(
                        <InputNumber min={0} placeholder="Estimated time" />
                    )}
                </FormItem>
                <FormItem
                    label="Description"
                    labelCol={{sm: {span: 5}}}
                    wrapperCol={{sm: {span: 19}}}>
                    {getFieldDecorator('taskDescription', {

                    })(
                        <TextArea rows={4} />
                    )}
                </FormItem>
                <FormItem
                    label="Priority"
                    labelCol={{sm: {span: 5}}}
                    wrapperCol={{sm: {span: 19}}}>
                    {getFieldDecorator('taskPriority', {
                        initialValue: priorities[0]
                    })(
                    <Select>
                        {priorities.map((item) => {
                            return (
                                <Option key={item} value={item}>
                                    {item}
                                </Option>
                            )
                        })}
                    </Select>
                    )}  
                </FormItem>
                <FormItem className="tac">
                    <Button
                        type="primary"
                        htmlType="submit"
                        >
                            Create
                    </Button>
                </FormItem>
                    
            </Form>
        )
    }
}

const WrappedCreate = Form.create()(createTaskForm);

export default WrappedCreate;