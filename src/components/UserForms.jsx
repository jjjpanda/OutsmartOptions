import React from 'react';
import {
  Input,
  Form,
  Button,
  Icon,
  Modal
} from 'antd';

import Cookie from 'js-cookie'
import verifyUser from './UserVerifier.jsx'
import * as post from '../jsLib/fetchLibrary.js';

const hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class LoginModal extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            confirmLoading: false,
        }
    }

    showModal = () => {
        this.setState(() => ({
          visible: true,
        }));
    };

    handleCancel = () => {
        this.setState(() => ({
          visible: false
        }));
    };

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState(() => ({confirmLoading: true}));
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            
            post.fetchReq('/api/users/login', JSON.stringify({email: values.email, password: values.password}), (data) => {
                if(data.success){
                    this.setState(() => ({
                        visible: false,
                        confirmLoading: false,
                    }), () => {
                        Cookie.set('id', data.id)
                        Cookie.set('token', data.token)
                        this.props.form.resetFields()
                    });
                }
                else{
                    this.setState(() => ({
                        visible: true,
                        confirmLoading: false,
                    }));
                }
            })
            
          }
        });
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        
        const emailError = isFieldTouched('email') && getFieldError('email');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        
        return(
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Log in
                </Button>

                <Modal
                title="Login"
                visible={this.state.visible}
                onOk={this.handleSubmit}
                okText="Login"
                okButtonProps = {{
                type:"primary",
                htmlType:"submit",
                disabled:hasErrors(getFieldsError())
                }}
                confirmLoading={this.state.confirmLoading}
                onCancel={this.handleCancel}
                >
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                        <Form.Item
                        validateStatus={emailError ? 'error' : ''}
                        help={emailError || ''}
                        >
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Please input your email!' }],
                        })(
                            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                        )}
                        </Form.Item>
                        <Form.Item
                        validateStatus={passwordError ? 'error' : ''}
                        help={passwordError || ''}
                        >
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" onPressEnter={this.handleSubmit} />
                        )}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

class RegisterModal extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            confirmLoading: false,
        }
    }

    showModal = () => {
        this.setState(() => ({
          visible: true
        }))
    }

    handleCancel = () => {
        this.setState(() => ({
          visible: false
        }));
    };

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState(() => ({confirmLoading: true}));
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            
            post.fetchReq('/api/users/register', JSON.stringify({name: values.userName, email: values.email, password: values.password, password2: values.password2}), (data) => {
                if(data._id != undefined){
                    this.setState(() => ({
                        visible: false,
                        confirmLoading: false,
                    }), () => {
                        Cookie.set('id', '')
                        Cookie.set('token', '')
                        this.props.form.resetFields()
                    });
                }
                else{
                    this.setState(() => ({
                        visible: true,
                        confirmLoading: false,
                    }));
                }
            })
            
          }
        });
    }
  
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
  
        // Only show error after a field is touched.
        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const emailError = isFieldTouched('email') && getFieldError('email');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        const reenterError = isFieldTouched('password2') && getFieldError('password2');

        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Register
                </Button>
                <Modal
                title="Register"
                visible={this.state.visible}
                onOk={this.handleSubmit}
                okText="Register"
                okButtonProps = {{
                    type:"primary",
                    htmlType:"submit",
                    disabled:hasErrors(getFieldsError())
                }}
                confirmLoading={this.state.confirmLoading}
                onCancel={this.handleCancel}
                >
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                        <Form.Item
                            validateStatus={userNameError ? 'error' : ''}
                            help={userNameError || ''}
                        >
                            {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                            )}
                        </Form.Item>
                        <Form.Item
                            validateStatus={emailError ? 'error' : ''}
                            help={emailError || ''}
                        >
                            {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Please input your email!' }],
                            })(
                            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                            )}
                        </Form.Item>
                        <Form.Item
                            validateStatus={passwordError ? 'error' : ''}
                            help={passwordError || ''}
                        >
                            {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )}
                        </Form.Item>
                        <Form.Item
                            validateStatus={reenterError ? 'error' : ''}
                            help={reenterError || ''}
                        >
                            {getFieldDecorator('password2', {
                            rules: [{ required: true, message: 'Please re-enter your Password!' }],
                            })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Re-enter Password" onPressEnter={this.handleSubmit} />
                            )}
                        </Form.Item>
                    </Form>
                </Modal>        
            </div>
        )
    }
}

class ChangePasswordModal extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            confirmLoading: false,
        }
    }

    showModal = () => {
        this.setState(() => ({
          visible: true
        }))
    }

    handleCancel = () => {
        this.setState(() => ({
          visible: false
        }));
    };

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState(() => ({confirmLoading: true}));
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            
            post.fetchReqAuth('/api/users/change', Cookie.get('token'), JSON.stringify({id: Cookie.get('id'), oldPassword: values.oldPassword, newPassword: values.newPassword, newPassword2: values.newPassword2}), (data) => {
                if(data.changed){
                    this.setState(() => ({
                        visible: false,
                        confirmLoading: false,
                    }), () => {
                        Cookie.set('id', '')
                        Cookie.set('token', '')
                        this.props.form.resetFields()
                    });
                }
                else{
                    this.setState(() => ({
                        visible: true,
                        confirmLoading: false,
                    }));
                }
            })
            
          }
        });
    }
  
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
  
        // Only show error after a field is touched.
        const oldPasswordError = isFieldTouched('oldPassword') && getFieldError('oldPassword');
        const newPasswordError = isFieldTouched('newPassword') && getFieldError('newPassword');
        const newPassword2Error = isFieldTouched('newPassword2') && getFieldError('newPassword2');

        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Register
                </Button>
                <Modal
                title="Register"
                visible={this.state.visible}
                onOk={this.handleSubmit}
                okText="Register"
                okButtonProps = {{
                    type:"primary",
                    htmlType:"submit",
                    disabled:hasErrors(getFieldsError())
                }}
                confirmLoading={this.state.confirmLoading}
                onCancel={this.handleCancel}
                >
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                        <Form.Item
                            validateStatus={oldPasswordError ? 'error' : ''}
                            help={oldPasswordError || ''}
                        >
                            {getFieldDecorator('oldPassword', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Old Password" />
                            )}
                        </Form.Item>
                        <Form.Item
                            validateStatus={newPasswordError ? 'error' : ''}
                            help={newPasswordError || ''}
                        >
                            {getFieldDecorator('newPassword', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="New Password" />
                            )}
                        </Form.Item>
                        <Form.Item
                            validateStatus={newPassword2Error ? 'error' : ''}
                            help={newPassword2Error || ''}
                        >
                            {getFieldDecorator('newPassword2', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Re-enter Password" />
                            )}
                        </Form.Item>
                    </Form>
                </Modal>        
            </div>
        )
    }
}

const LoginForm = Form.create()(LoginModal)
const RegisterForm = Form.create()(RegisterModal)
const ChangePasswordForm = Form.create()(ChangePasswordModal)

export { LoginForm, RegisterForm, ChangePasswordForm };