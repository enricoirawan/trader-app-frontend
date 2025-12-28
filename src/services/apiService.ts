import type { AxiosRequestConfig } from 'axios';
import api from '../lib/axios';

export const apiService = {
  get: <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return api.get<T>(url, config).then((res) => res.data);
  },

  post: <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return api.post<T>(url, data, config).then((res) => res.data);
  },

  put: <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return api.put<T>(url, data, config).then((res) => res.data);
  },

  patch: <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return api.patch<T>(url, data, config).then((res) => res.data);
  },

  delete: <T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return api.delete<T>(url, config).then((res) => res.data);
  },
};
