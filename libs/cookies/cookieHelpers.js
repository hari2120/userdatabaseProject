import Cookie from 'js-cookie';
import { isProd, cookieName } from '../../config/Config';

export const setCookie = (value) => {
  Cookie.set(cookieName, value, { expires: 30, secure: isProd });
};

export const getCookieValue = (name) => (
  Cookie.get(name)
);

export const setCookieParams = (name, value) => (
  Cookie.set(name, value, { expires: 1, secure: isProd })
);

export const setFarExpireCookieParams = (name, value) => (
  Cookie.set(name, value, { expires: 365, secure: isProd })
);

export const deleteCookie = () => { Cookie.remove(cookieName); };
