import React from 'react';

import verifyUser from '../components/UserVerifier.jsx';
import {
  LoginForm, RegisterForm, ChangePasswordForm, SignOut, DeleteAccount,
} from '../components/UserForms.jsx';

const hasErrors = (fieldsError) => Object.keys(fieldsError).some((field) => fieldsError[field]);

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 1,
      loggedIn: false,
      loginVisible: false,
      registerVisible: false,
      confirmLoading: false,
    };
    verifyUser(({ loggedIn, username, email }) => {
      this.setState(() => ({ loggedIn }));
    });
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <div>

          <ChangePasswordForm />
          <br />
          <SignOut />
          <br />
          <DeleteAccount />
          <br />

        </div>
      );
    }

    return (
      <div>

        <LoginForm />
        <br />
        <RegisterForm />
        <br />

      </div>
    );
  }
}

export default LoginPage;
