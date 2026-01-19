import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

// 基础路径配置
const getBaseUrl = () => {
    if (typeof window === 'undefined') {
        // 服务端渲染时需要完整路径
        return process.env.SERVER_API_URL || 'http://localhost:3000/api';
    }
    // 客户端使用相对路径
    return process.env.NEXT_PUBLIC_API_BASE_URL || '/api';
};

// Create axios instance with default config
const request: AxiosInstance = axios.create({
    baseURL: getBaseUrl(),
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
request.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        let token: string | undefined;

        if (typeof window !== 'undefined') {
            // 客户端：从 js-cookie 获取
            token = Cookies.get('token');
        } else {
            // 服务端 (SSR)：从 next/headers 获取
            try {
                const { cookies } = await import('next/headers');
                const cookieStore = await cookies();
                token = cookieStore.get('token')?.value;
            } catch (error) {
                // 忽略非请求上下文中的错误
            }
        }

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
