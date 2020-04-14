import Cookies from 'js-cookie';

import {
  utilique as util,
} from 'que-series';

const { request } = util;

export default function verifyUser(callback) {
  request.postFetchReqAuth('/api/users/current', Cookies.get('token'), JSON.stringify({ id: Cookies.get('id') }), (data) => {
    if (data.error) {
      callback({ loggedIn: false, username: '', email: '' });
    } else {
      console.log(`Logged in: ${data != undefined && data.current != undefined && data.current.name != undefined}`);
      console.log(data);
      callback({ loggedIn: data != undefined && data.current != undefined && data.current.name != undefined, username: data.current.name, email: data.current.email });
    }
  });
}
