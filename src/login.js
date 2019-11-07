import React from 'react';
import { 
    Input, 
    Tooltip, 
    Icon 
} from 'antd';

class Login extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div style={{paddingLeft:'60px', paddingTop:'20px'}}>
                <Input
                placeholder="Username"
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                suffix={
                    <Tooltip title="Enter your username">
                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                    </Tooltip>
                }
                />
            
                <br />
                <br />

                <Input
                placeholder="Password"
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                suffix={
                    <Tooltip title="Enter your password">
                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                    </Tooltip>
                }
                />
            
            </div>,
            mountNode
        )
    }
}

export default Login;