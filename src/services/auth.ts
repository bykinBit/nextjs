import { get, post } from '@/utils/request';
import type { ApiResponse, LoginInput, RegisterInput, AuthResponse, User } from './types';
import Cookies from 'js-cookie';

/**
 * 认证服务 - 统一管理认证相关的 API 调用
 */
export const authService = {
    /**
     * 用户登录
     */
    async login(input: LoginInput): Promise<AuthResponse | null> {
        try {
            const response = await post<ApiResponse<AuthResponse>>('/auth/login', input);
            if (response.success && response.data) {
                const { token, user, expiresAt } = response.data;

                // 存储到 Cookie (供 Middleware 使用)
                if (typeof window !== 'undefined') {
                    const cookieOptions: Cookies.CookieAttributes = {
                        expires: expiresAt ? new Date(expiresAt) : 7, // 如果没有过期时间，默认 7 天
                        path: '/',
                    };
                    Cookies.set('token', token, cookieOptions);
                    localStorage.setItem('user', JSON.stringify(user));
                }
                return response.data;
            }
            return null;
        } catch (error) {
            console.error('Login failed:', error);
            return null;
        }
    },

    /**
     * 令牌验证
     */
    async validate(): Promise<User | null> {
        try {
            const response = await get<ApiResponse<{ user: User }>>('/auth/validate');
            if (response.success && response.data) {
                return response.data.user;
            }
            return null;
        } catch (error) {
            console.error('Validation failed:', error);
            return null;
        }
    },

    /**
     * 用户注册
     */
    async register(input: RegisterInput): Promise<User | null> {
        try {
            const response = await post<ApiResponse<User>>('/auth/register', input);
            if (response.success && response.data) {
                return response.data;
            }
            return null;
        } catch (error) {
            console.error('Registration failed:', error);
            return null;
        }
    },

    /**
     * 用户登出
     */
    logout(): void {
        if (typeof window !== 'undefined') {
            Cookies.remove('token');
            localStorage.removeItem('user');
            localStorage.removeItem('auth-storage'); // 同时也清除 Zustand 的持久化数据
        }
    },

    /**
     * 获取当前用户 (从 LocalStorage)
     */
    getCurrentUser(): User | null {
        if (typeof window !== 'undefined') {
            const userStr = localStorage.getItem('user');
            if (userStr) {
                try {
                    return JSON.parse(userStr);
                } catch {
                    return null;
                }
            }
        }
        return null;
    },

    /**
     * 获取 token (从 Cookie)
     */
    getToken(): string | null {
        return Cookies.get('token') || null;
    },
};
