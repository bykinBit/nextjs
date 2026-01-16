import { get, post, put, del } from '@/utils/request';
import type { ApiResponse, User, CreateUserInput, UpdateUserInput } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

/**
 * 用户服务 - 统一管理用户相关的 API 调用
 */
export const userService = {
    /**
     * 获取所有用户
     */
    async getAll(): Promise<User[]> {
        try {
            const response = await get<ApiResponse<User[]>>(`${API_BASE_URL}/users`);
            if (response.success && Array.isArray(response.data)) {
                return response.data;
            }
            console.error('API request failed:', response);
            return [];
        } catch (error) {
            console.error('Failed to fetch users:', error);
            return [];
        }
    },

    /**
     * 根据 ID 获取用户
     */
    async getById(id: number): Promise<User | null> {
        try {
            const response = await get<ApiResponse<User>>(`${API_BASE_URL}/users/${id}`);
            if (response.success && response.data) {
                return response.data;
            }
            return null;
        } catch {
            return null;
        }
    },

    /**
     * 创建新用户
     */
    async create(input: CreateUserInput): Promise<User | null> {
        try {
            const response = await post<ApiResponse<User>>(`${API_BASE_URL}/users`, input);
            if (response.success && response.data) {
                return response.data;
            }
            return null;
        } catch (error) {
            console.error('Failed to create user:', error);
            return null;
        }
    },

    /**
     * 更新用户
     */
    async update(id: number, input: UpdateUserInput): Promise<User | null> {
        try {
            const response = await put<ApiResponse<User>>(`${API_BASE_URL}/users/${id}`, input);
            if (response.success && response.data) {
                return response.data;
            }
            return null;
        } catch (error) {
            console.error('Failed to update user:', error);
            return null;
        }
    },

    /**
     * 删除用户
     */
    async delete(id: number): Promise<boolean> {
        try {
            const response = await del<ApiResponse<null>>(`${API_BASE_URL}/users/${id}`);
            return response.success;
        } catch (error) {
            console.error('Failed to delete user:', error);
            return false;
        }
    },
};
