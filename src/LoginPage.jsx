import React from 'react';
import {
  Input,
  Form,
  Checkbox,
  Button,
} from 'antd';
import { 
  UserOutlined,
  LockOutlined, 
} from '@ant-design/icons';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    onFinish = values => {
      console.log('Received values of form: ', values);
    };
  }

  render() {
    return (
      <Form
        name="login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Enter your username' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Enter your password' }]}
      >
      <Input
        prefix={<LockOutlined className="site-form-item-icon" />}
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
