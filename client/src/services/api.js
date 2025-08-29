import axios from 'axios';
import { API_BASE_URL } from '../config/config';
import { clearUser } from '../features/auth/authSlice';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

let injectedStore;

export const injectStore = (s) => {
  injectedStore = s;
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    const state = injectedStore?.getState();
    const isAuthenticated = state?.auth?.isLoggedIn; 

    if (
      status === 401 &&
      message &&
      (message.toLowerCase().includes('token') || message.toLowerCase().includes('expired'))
    ) {
      console.log("401 ERROR")
      if(isAuthenticated){
        toast.error("Session expired, please log in again");
      }
      injectedStore?.dispatch(clearUser());
    }

    return Promise.reject(error);
  }
);

export default api;
