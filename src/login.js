import React from 'react';
import {
  Input,
  Tooltip,
  Icon,
  Button,
} from 'antd';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Input
          placeholder="Enter Username"
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          suffix={(
            <Tooltip title="Extra information">
              <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip>
              )}
        />

        <br />
        <br />

        <Input.Password placeholder="Enter Password" />
      </div>,
      document.getElementById('container')
    );
  }
}

export default Login;
