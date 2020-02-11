import React from 'react';

import verifyUser from './components/UserVerifier.jsx'
import {LoginForm, RegisterForm, ChangePasswordForm, SignOut, DeleteAccount} from './components/UserForms.jsx'

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
      if(this.state.loggedIn){
        return (
          <div>
            
            <ChangePasswordForm/>
            <SignOut/>
            <DeleteAccount/>
          
          </div>
        )
      }
      else{
        return (
          <div>
            
            <LoginForm/>
            <RegisterForm/>
          
          </div>
        );
      }
    }
  }
  
  export default LoginPage;
  