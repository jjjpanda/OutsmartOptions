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

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const Public = () => <h3>Public</h3>
const Protected = () => <h3>Protected</h3>

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
  }

  onFinish = values => {
   console.log('Received values of form: ', values);
  };

  state = {
    redirectToReferrer: false
  }
  login = () => {
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }))
    })
  }

  render() {
    const { redirectToReferrer } = this.state

    if (redirectToReferrer === true) {
      return <Redirect to='/' />
    }
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
