import React from 'react';

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {username: '', password: ''}
    }

    render(){
        return (
            <div>
              <MuiThemeProvider>
                <div>
                <AppBar
                    title="Login"
                />
                <TextField
                    hintText="Input Username"
                    floatingLabelText="Username"
                    onChange = {(event,newValue) => this.setState({username:newValue})}
                />
                <br/>
                    <TextField
                        type="password"
                        hintText="Input Password"
                        floatingLabelText="Password"
                        onChange = {(event,newValue) => this.setState({password:newValue})}
                    />
                   <br/>
                   <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default Login;