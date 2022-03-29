import Axios from 'axios';
import setCookieHeader from '../../../libs/utils/setCookieHeader';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { body: { email, password } = { email: '', password: '' } } = req;
    res.setHeader('Content-Type', 'application/json');
    try {
      const { data } = await Axios.post('http://localhost:8000/signin', { email, password });
      const { accessToken: {token} } = data;
      res.statusCode = 200;
      res.setHeader('Set-Cookie', setCookieHeader(token));
      res.end(JSON.stringify(data));
    } catch (error) {
      console.log(error);
      if (error.response) {
        res.statusCode = error.response.status;
        res.setHeader('Set-Cookie', setCookieHeader());
        res.end(JSON.stringify(error.response.data));
      } else {
        res.statusCode = 400;
        res.end(JSON.stringify({ non_field_errors: ['Network Error (please try later)'] }));
      }
    }
  } else {
    res.statusCode = 405;
    res.end();
  }
}
