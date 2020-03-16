import Cookies from 'js-cookie';

import * as util from "utilique"
let post = util.fetch

export default function verifyUser(callback) {
  post.fetchReqAuth('/api/users/current', Cookies.get('token'), JSON.stringify({ id: Cookies.get('id') }), (data) => {
    console.log(`Logged in: ${data != undefined && data.user != undefined}`);
    console.log(data);
    callback({ loggedIn: data != undefined && data.user != undefined, username: data.user, email: data.email });
  });
}
