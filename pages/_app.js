import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import '../styles/globals.css'
import store from '../libs/redux/store';
import cookie from 'cookie';
import Cookies from 'js-cookie';
import {updateUser, loginFailed} from '../components/user/LoginSlice'
import parseCookies from '../libs/cookies/parseCookies';
import getHeaders from '../libs/utils/getHeaders';
import setCookieHeader from '../libs/utils/setCookieHeader';
import axios from 'axios';

function MyApp(initialProps) {
  const { Component, pageProps, isServer } = initialProps;
  if (isServer) {
    const { isLoggedIn, accessToken, userDetails } = initialProps;
    if (isLoggedIn) {
      store.dispatch(updateUser({ isLoggedIn, accessToken, userDetails }));
    } else {
      store.dispatch(loginFailed());
    }
  }
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>)
}


MyApp.getInitialProps = async ({ctx}) => {
  const isServer = typeof window === 'undefined';
 
  if (isServer) {
    const { req, res } = ctx;
    // const parseCookies = (request) => (cookie.parse(request ? request.headers.cookie || '' : document.cookie));

    // console.log('parseCookies, ', parseCookies(req));
    const cookies = parseCookies(req);
    const accessToken = cookies['niladisify'] || '';
    const headers = getHeaders(accessToken);
    console.log('headers at here', headers);
    try {
      const { data } = await axios.get('http://localhost:8000/user', { headers });
      res.setHeader('Set-Cookie', setCookieHeader(accessToken));
      console.log('data', data);
      return {
        isServer, isLoggedIn: true, accessToken, userDetails: data,
      };
    } catch (error) {
      res.setHeader('Set-Cookie', setCookieHeader());
      console.log('error', error);
      return { isServer, isLoggedIn: false };
    }
  }
  return { isServer: false };
};

export default MyApp
