import React from 'react';
import {
  Input,
  Form,
  Checkbox,
  Button,
  Icon,
  BrowserRouter as Router,
  Link,
  Route,
  withRouter,
  Redirect
} from 'antd';

import Cookie from 'js-cookie'

class LoginPage extends React.Component {
    constructor(props) {
      super(props);
    }
  
    onFinish = values => {
     //console.log('Received values of form: ', values);
    };
  
    render() {
      return (
        <Form
          name="login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
        >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Enter your username' }]}
        >
          <Input prefix={<Icon type="right"/>} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Enter your password' }]}
        >
        <Input
          prefix={<Icon type="right"/>}
          type="password"
          placeholder="Password"
        />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember Me</Checkbox>
          </Form.Item>
  
          <a className="login-form-forgot" href="">
            Forgot Password
          </a>
        </Form.Item>
  
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log In
          </Button>
          Or <a href="">Register</a>
        </Form.Item>
      </Form>
      );
    }
  }
  
  export default LoginPage;
  