import React from 'react';
import { Form, Input, Icon, Button, Spin } from 'antd';
import { Link } from 'react-router';
const FormItem = Form.Item;

class createTaskForm extends React.Component {
    constructor(props) {
        super(props);
    }

    isNum = (rule, value, callback) => {
        if (!Number(value)) callback('Must be a number!');
        callback();
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const nameError = isFieldTouched('name') && getFieldError('name');
        const estimatedError = isFieldTouched('estimated') && getFieldError('estimated');
        return (
            <Form 
                layout="vertical"
                onSubmit={this.handleSubmit}>
                <FormItem 
                    validateStatus={nameError ? 'error' : ''}
                    help={nameError || ''}
                    label="Name"
                    labelCol={{sm: {span: 10}}}
                    wrapperCol={{sm: {span: 14}}}>
                    
                    {getFieldDecorator('name', {
                        rules: [
                        {
                            required: true,
                            message: 'Please input task name!'
                        },
                        ]
                    })(
                        <Input placeholder="Task name" />
                    )}
                </FormItem>
                <FormItem 
                    validateStatus={estimatedError ? 'error' : ''}
                    help={estimatedError || ''}
                    label="Estimated"
                    labelCol={{sm: {span: 10}}}
                    wrapperCol={{sm: {span: 14}}}>
                    
                    {getFieldDecorator('estimated', {
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
                        <Input placeholder="Estimated time" />
                    )}
                </FormItem>
                    
            </Form>
        )
    }
}

const WrappedCreate = Form.create()(createTaskForm);

export default WrappedCreate;