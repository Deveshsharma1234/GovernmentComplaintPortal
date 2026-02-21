// src/utils/apiClient.js
import axios from 'axios';
import store from '../redux/store/AppStore.js'; // Import your Redux store
import { removeUser } from '../redux/slice/userSlice.js'; // Your logout action
import { BASE_URL } from './constants';

// Create axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, 
});

// Added response interceptor
apiClient.interceptors.response.use(
    
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
    
      store.dispatch(removeUser());
      
     

    }
    return Promise.reject(error);
  }
);

export default apiClient;