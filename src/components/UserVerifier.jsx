import React from 'react';

import * as post from '../jsLib/fetchLibrary.js';
import Cookies from 'js-cookie'

class UserVerifier extends React.Component {
    constructor(props){    
        super(props);
        this.state = {
            key : props.key
        };
        post.fetchReqAuth('/api/users/current', Cookies.get('token'), JSON.stringify({ id: Cookies.get('id') }), (data) => {
            console.log(data != undefined && data.user != undefined);
            this.setState(() => ({
                loggedIn : data != undefined && data.user != undefined
            }))
        });   
    }

    static getDerivedStateFromProps(props, state) {
        if (props.key !== state.key) {
            post.fetchReqAuth('/api/users/current', Cookies.get('token'), JSON.stringify({ id: Cookies.get('id') }), (data) => {
                this.setState(() => ({
                    loggedIn : data != undefined && data.user != undefined
                }))
            }); 
            return {
                loggedIn : false
            };
        }
        return null;
    }

    onCheck = () => {
        this.props.callbackUpdate(this.state);
    }

    render() {
        return null
    }
}

export default UserVerifier;