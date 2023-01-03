import { API_URL } from '@env';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: API_URL || '',
  timeout: 10000,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.log(error.response.status);
      return Promise.reject({});
    }
    if (error.request) {
      console.log(error);
      return Promise.reject({});
    }
    return Promise.reject({});
  },
);

export const getApi = (url, data) =>
  axiosInstance
    .get(url, {
      params: data,
    })
    .then((response) => response.data)
    .catch((error) => error);

export const postApi = (url, data, headers = {}) =>
  axiosInstance
    .post(url, data, headers)
    .then((response) => response.data)
    .catch((error) => error);

export const putApi = (url, data) =>
  axiosInstance
    .put(url, data)
    .then((response) => response.data)
    .catch((error) => error);

export const patchApi = (url, data) =>
  axiosInstance
    .patch(url, data)
    .then((response) => response.data)
    .catch((error) => error);

export const deleteApi = (url) =>
  axiosInstance
    .delete(url)
    .then((response) => response.data)
    .catch((error) => error);

export const uploadApi = (url, data) =>
  axiosInstance
    .post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => response.data);

export default axiosInstance;
