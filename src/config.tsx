export const serverUrl =
  location.hostname === 'localhost'
    ? 'http://localhost:1969/'
    : 'https://render';
