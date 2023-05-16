import axios from 'axios';

// axios.defaults.baseURL = 'https://api.example.com';
// axios.defaults.headers.common.Authorization = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] =
//   'application/x-www-form-urlencoded';

const instance = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  // baseURL: 'https://api-dev.naranggo.com:4430/',
  timeout: 100000
});

instance.defaults.headers.common['Cache-Control'] =
  'no-cache, no-store, must-revalidate'; // for all requests

// instance.defaults.headers.common.Authorization =
//   'auth-token-here';

export default instance;
