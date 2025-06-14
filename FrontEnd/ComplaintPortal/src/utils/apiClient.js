// src/utils/apiClient.js
import axios from 'axios';
import store from '../redux/store/AppStore.js'; // Import your Redux store
import { removeUser } from '../redux/slice/userSlice.js'; // Your logout action
import { BASE_URL } from './constants';

// Create axios instance
const apiClient = axios.create({
  baseURL: BASE_URL, //base url
  withCredentials: true, // Send cookies with requests
});

// Added response interceptor
apiClient.interceptors.response.use(
    
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Unauthorized - token expired or invalid
      // Dispatch logout
      store.dispatch(removeUser());
      
      // Optional: Redirect to login page
      // Since this is outside React components, you need to get access to navigate
      // One way: use a custom hook or set up a navigation utility

    }
    return Promise.reject(error);
  }
);

export default apiClient;