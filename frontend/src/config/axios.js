import axios from 'axios';
import globalRouter from './globalRouter';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      console.log('Unauthorized');
      globalRouter.navigate('/login');
    }
    return error;
  },
);
