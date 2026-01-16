import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

// Create axios instance with default config
const request: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
request.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 从 Cookie 中获取 token (支持 SSR 和客户端)
        const token = Cookies.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
request.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data;
    },
    (error) => {
        // Handle common errors
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // Handle unauthorized - 可能是 token 过期
                    console.error('Unauthorized');
                    // 可选：在客户端触发登出
                    if (typeof window !== 'undefined') {
                        Cookies.remove('token');
                        localStorage.removeItem('user');
                    }
                    break;
                case 403:
                    console.error('Forbidden');
                    break;
                case 404:
                    console.error('Not Found');
                    break;
                case 500:
                    console.error('Server Error');
                    break;
                default:
                    console.error('Request failed:', error.message);
            }
        }
        return Promise.reject(error);
    }
);

// Helper methods
export const get = <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return request.get(url, config);
};

export const post = <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    return request.post(url, data, config);
};

export const put = <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    return request.put(url, data, config);
};

export const del = <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return request.delete(url, config);
};

export default request;
