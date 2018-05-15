import React from 'react';
import { Form, Input, Icon, Button, Spin } from 'antd';
import { Link } from 'react-router';
const FormItem = Form.Item;

const hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.props.form.validateFields();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.handleSubmit(values);
            }
        })
    }

    comparePasswords = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback(`Passwords don't match`);
        } else {
            callback();
        }
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const emailError = isFieldTouched('email') && getFieldError('email');
        const usernameError = isFieldTouched('username') && getFieldError('username');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        const password2Error = isFieldTouched('password2') && getFieldError('password2');
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
                    validateStatus={usernameError ? 'error' : ''}
                    help={usernameError || ''}>
                    {getFieldDecorator('username', {
                        rules: [
                        {
                            required: true,
                            message: 'Please input your username!'
                        }
                        ]
                    })(
                        <Input type="text" placeholder="Username" />
                    )}
                </FormItem>

                <FormItem
                    validateStatus={passwordError ? 'error' : ''}
                    help={passwordError || ''}>
                    {getFieldDecorator('password', {
                        rules: [
                        {
                            required: true,
                            message: 'Please input a password!'
                        }
                        ]
                    })(
                        <Input type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem
                    validateStatus={password2Error ? 'error' : ''}
                    help={password2Error || ''}>
                    {getFieldDecorator('password2', {
                        rules: [
                        {
                            required: true,
                            message: 'Please repeat the password!'
                        },
                        {
                            validator: this.comparePasswords
                        }
                        ]
                    })(
                        <Input type="password" placeholder="Repeat the password" />
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
                        className="mr"
                        disabled={hasErrors(getFieldsError())}>
                            Register
                    </Button>
                    <Link to="/login">
                        <Button
                            type="default"

                            >
                            I already have an account
                        </Button>
                    </Link>
                </FormItem>
            </Form>
        )
    }
}

const WrappedRegister = Form.create()(Register);

export default WrappedRegister;