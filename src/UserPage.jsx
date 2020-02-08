import React from 'react';

import verifyUser from './components/UserVerifier.jsx'
import {LoginForm, RegisterForm, ChangePasswordForm} from './components/UserForms.jsx'

const hasErrors = (fieldsError) => {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class LoginPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          key : 1,
          loggedIn : false,
          loginVisible: false,
          registerVisible: false,
          confirmLoading: false,
      }
      verifyUser((loggedIn) => {
        this.setState(() => ({loggedIn : loggedIn}))
      })
    }
  
    render() {

      return (
        <div>
          
          <LoginForm/>
          <RegisterForm/>
          <ChangePasswordForm/>
        
        </div>
      );
    }
  }
  
  export default LoginPage;
  