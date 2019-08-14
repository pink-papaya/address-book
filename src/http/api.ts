import axios from 'axios';
import store from '@/store';

const api = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
});

// api.createCancelToken = () => axios.CancelToken.source();

api.interceptors.response.use(
  response => {
    const data = response.data;

    if (!data.success) {
      throw new Error('error');
    }

    return data.value;
  },
  // error => {
  //   if (error.response.data && error.response.data instanceof Object) {
  //     return Promise.reject(error.response.data);
  //   }
  //
  //   return Promise.reject(error);
  // },
);

export default api;
