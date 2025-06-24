// src/utils/apiClient.js
import axios from 'axios';
import store from '../redux/store/AppStore.js'; // Import your Redux store
import { addUser, removeUser } from '../redux/slice/userSlice.js'; // Your logout action
import { BASE_URL } from './constants';

// Create axios instance
const apiClient = axios.create({
  baseURL: BASE_URL, //base url
  withCredentials: true, // Send cookies with requests
});

// // Added response interceptor
// apiClient.interceptors.response.use(
    
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       // Unauthorized - token expired or invalid
//       // Dispatch logout
//       store.dispatch(removeUser());
      
//       // Optional: Redirect to login page
//       // Since this is outside React components, you need to get access to navigate
//       // One way: use a custom hook or set up a navigation utility

//     }
//     return Promise.reject(error);
//   }
// );
// Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // Check if it's a 401 error and not a retry attempt already
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark as retried to prevent infinite loops

      try {
        // Attempt to refresh token
        const user = store.getState().user.user;
        if (user && user.refreshToken) { // Assuming you have a refresh token
          const refreshResponse = await axios.post(BASE_URL+'/auth/refresh-token', {
            refreshToken: user.refreshToken,
          });

          const newAccessToken = refreshResponse.data.accessToken;
          const newRefreshToken = refreshResponse.data.refreshToken; // If you rotate refresh tokens

          // Update Redux store with new token
          store.dispatch(addUser({ ...user, token: newAccessToken, refreshToken: newRefreshToken }));

          // Update the original request's header with the new token
          // originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          // Retry the original request
          return apiClient(originalRequest);
        } else {
          // No refresh token available, or something is wrong - force logout
          store.dispatch(removeUser());
          // Redirect to login (you'll need to handle this outside of the interceptor or via a global navigation mechanism)
          window.location.href = '/login'; // Simple but effective redirect
        }
      } catch (refreshError) {
        // Refresh token failed, force logout
        console.error("Refresh token failed:", refreshError);
        store.dispatch(removeUser());
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;