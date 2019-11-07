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
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    hintText="Input Username"
                    floatingLabelText="Username"
                    onChange = {(event,newValue) => this.setState({username:newValue})}
                />
                <br/>
                    <TextField
                        type="password"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        hintText="Input Password"
                        floatingLabelText="Password"
                        onChange = {(event,newValue) => this.setState({password:newValue})}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                    Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                        <Link href="#" variant="body2">
                        Forgot password?
                        </Link>
                        </Grid>
                        <Grid item>
                        <Link href="#" variant="body2">
                            {"Sign Up"}
                        </Link>
                        </Grid>
                    </Grid>
                   <br/>
                   <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default Login;