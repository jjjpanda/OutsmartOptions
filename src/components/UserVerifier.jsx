import React from 'react';

import * as post from '../jsLib/fetchLibrary.js';
import Cookies from 'js-cookie'

class UserVerifier extends React.Component {
    constructor(props){    
        super(props);
        post.fetchReqAuth('/api/users/current', Cookies.get('token'), JSON.stringify({ id: Cookies.get('id') }), (data) => {
            console.log(data);
            this.setState(() => ({
                loggedIn : data.user != undefined
            }))
        });   
    }

    onRequestUpdate = () => {
        post.fetchReqAuth('/api/users/current', Cookies.get('token'), JSON.stringify({ id: Cookies.get('id') }), (data) => {
            console.log(data);
            this.setState(() => ({
                loggedIn : data.user != undefined
            }))
        });   
        this.props.callbackUpdate(this.state);
    }

    onCheck = () => {
        this.props.callbackUpdate(this.state);
    }

    render() {
        return null
    }
}

export default UserVerifier;