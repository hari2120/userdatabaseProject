const getHeaders = (accessToken) => {
  if (accessToken) {
    return {
      'Content-Type': 'application/json',
      Authorization: accessToken,
      'Accept': 'application/json',
      'Origin': 'http://localhost:3000',
      'credentials': 'include'
    };
  }
  return {
    'Content-Type': 'application/json',
  };
};

export default getHeaders;
