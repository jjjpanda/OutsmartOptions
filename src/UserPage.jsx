import React from 'react';
import {
  Input,
  Form,
  Button,
  Icon,
  Modal
} from 'antd';

import UserVerifier from './components/UserVerifier.jsx'

const hasErrors = (fieldsError) => {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class LoginForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          key : 1,
          loggedIn : false,
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
      console.log('Clicked cancel button');
      this.setState(() => ({
        visible: false,
      }));
    };

    componentDidMount() {
      // To disabled submit button at the beginning.
      this.props.form.validateFields();
    }

    handleSubmit = (e) => {
      e.preventDefault();
      this.setState((state) => ({key: state.key+1, confirmLoading: true}));
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          this.setState(() => ({
            visible: false,
            confirmLoading: false,
          }), () => {
            this.props.form.resetFields()
          });
        }
      });
    }

    onUserLogin = (state) => {
        this.setState(() => ({loggedIn : state.loggedIn}))
    }
  
    render() {
      const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
  
      // Only show error after a field is touched.
      const userNameError = isFieldTouched('userName') && getFieldError('userName');
      const passwordError = isFieldTouched('password') && getFieldError('password');
      
      return (
        <div>
          <UserVerifier callbackUpdate={this.onUserLogin} key={this.state.key} />

          <Button type="primary" onClick={this.showModal}>
            Log in
          </Button>
          <Modal
          title="Title"
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
      );
    }
  }

  const LoginPage = Form.create()(LoginForm);
  
  export default LoginPage;
  