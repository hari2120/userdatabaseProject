import Axios from 'axios';
import getHeaders from '../../../libs/utils/getHeaders';
import setCookieHeader, { cookieName } from '../../../libs/utils/setCookieHeader';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { authorization = '' } = req.headers;
    const accessToken = authorization.replace('Token', '').trim();
    const headers = getHeaders(accessToken);
    // console.log('at user', headers);
    try {
      const { data } = await Axios.get('http://localhost:8000/user', { headers });
      res.statusCode = 200;
      res.setHeader('Set-Cookie', setCookieHeader(accessToken));
      res.end(JSON.stringify(data));
    } catch (error) {
      res.statusCode = error.response.status;
      // res.setHeader('Set-Cookie', setCookieHeader());
      res.end(JSON.stringify(error.response.data));
    }
  } else {
    res.statusCode = 405;
    res.end();
  }
}
