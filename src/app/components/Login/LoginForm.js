import React from 'react';
import { Form, Input, Icon, Button, Spin } from 'antd';
const FormItem = Form.Item;

const hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.props.form.validateFields();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.logIn(values);
            }
        })
    }

    logIn = (data) => {
        this.props.handleSubmit(data);
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const emailError = isFieldTouched('email') && getFieldError('email');
        const pwdError = isFieldTouched('password') && getFieldError('password');
        return(
            <Form layout="vertical" onSubmit={this.handleSubmit}>
                <FormItem
                    validateStatus={emailError ? 'error' : ''}
                    help={emailError || ''}>
                    {getFieldDecorator('email', {
                        rules: [
                        {
                            required: true,
                            message: 'Please input your email!'
                        },
                        {
                            type: 'email',
                            message: 'This is not a valid email!'
                        }
                        ]
                    })(
                        <Input placeholder="Email" />
                    )}
                </FormItem>
                <FormItem
                    validateStatus={pwdError ? 'error' : ''}
                    help={pwdError || ''}>
                    {getFieldDecorator('password', {
                        rules: [
                        {
                            required: true,
                            message: 'Please input your password!'
                        }
                        ]
                    })(
                        <Input type="password" placeholder="Password" />
                    )}
                </FormItem>
                {this.props.error &&
                    <p className="tm__error">
                        {this.props.error}
                    </p>
                }
                <FormItem>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={hasErrors(getFieldsError())}>
                            Log in
                    </Button>
                </FormItem>
            </Form>
        )
    }
}

const WrappedLoginForm = Form.create()(LoginForm);

export default WrappedLoginForm;