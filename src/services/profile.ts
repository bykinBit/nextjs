import { get, put } from '@/utils/request';
import type { ApiResponse, User, ProfileUpdateInput } from './types';

/**
 * 个人资料服务 - 管理当前登录用户的个人信息
 */
export const profileService = {
    /**
     * 获取个人资料
     */
    async getProfile(): Promise<User | null> {
        try {
            const response = await get<ApiResponse<User>>('/profile');
            if (response.success && response.data) {
                return response.data;
            }
            return null;
        } catch (error) {
            console.error('Failed to fetch profile:', error);
            return null;
        }
    },

    /**
     * 更新个人资料
     */
    async updateProfile(input: ProfileUpdateInput): Promise<User | null> {
        try {
            const response = await put<ApiResponse<User>>('/profile', input);
            if (response.success && response.data) {
                return response.data;
            }
            return null;
        } catch (error) {
            console.error('Failed to update profile:', error);
            return null;
        }
    },
};
