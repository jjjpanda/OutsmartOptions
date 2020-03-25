import Cookies from 'js-cookie';

import {
  utilique as util,
} from 'que-series';

const { request } = util;

export default function verifyUser(callback) {
  request.postFetchReqAuth('/api/users/current', Cookies.get('token'), JSON.stringify({ id: Cookies.get('id') }), (data) => {
    console.log(`Logged in: ${data != undefined && data.user != undefined}`);
    console.log(data);
    callback({ loggedIn: data != undefined && data.user != undefined, username: data.user, email: data.email });
  });
}
