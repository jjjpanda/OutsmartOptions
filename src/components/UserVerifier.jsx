import * as post from '../jsLib/fetchLibrary.js';
import Cookies from 'js-cookie'

export default function verifyUser(callback) {
    post.fetchReqAuth('/api/users/current', Cookies.get('token'), JSON.stringify({ id: Cookies.get('id') }), (data) => {
        console.log(data != undefined && data.user != undefined);
        callback(data != undefined && data.user != undefined)
    });   
};