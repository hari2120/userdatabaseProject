export const cookieName = 'niladisify';
const cookieMaxAge = 604800;
const cookiePath = '/';
const SameSite = 'Strict';
const cookieSecure = false;

const setCookieHeader = (accessToken = '') => {
  let cookie;

  if (accessToken) {
    cookie = `${cookieName}=${accessToken};Max-Age=${cookieMaxAge};Path=${cookiePath};HttpOnly;SameSite=${SameSite};`;
  } else {
    cookie = `${cookieName}='';Max-Age=0;Path=${cookiePath};HttpOnly;SameSite=${SameSite};`;
  }

  if (cookieSecure) {
    cookie = `${cookie}Secure;`;
  }
  return [cookie];
};

export default setCookieHeader;
