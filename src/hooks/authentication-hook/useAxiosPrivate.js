import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';
import useRefreshToken from './useRefreshToken';

const axiosPrivate = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
  withCredentials: true,
});

const useAxiosPrivate = () => {
  const { auth } = useAuth();
  const refresh = useRefreshToken();
  const userId = auth?.id || localStorage.getItem("userItem")
  localStorage.setItem("userId", userId)

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      config => {
        let token = auth?.accessToken || localStorage.getItem('accessToken')
        if (!config.headers['Authorization'] && token) {
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      res => res,
      async error => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest._retry) {
          prevRequest._retry = true;
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
