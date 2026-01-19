import { get } from '@/utils/request';
import type { ApiResponse, DashboardStats } from './types';

/**
 * 仪表盘服务 - 提供系统统计数据
 */
export const dashboardService = {
    /**
     * 获取系统统计数据
     */
    async getStats(): Promise<DashboardStats | null> {
        try {
            const response = await get<ApiResponse<DashboardStats>>('/dashboard/stats');
            if (response.success && response.data) {
                return response.data;
            }
            return null;
        } catch (error) {
            console.error('Failed to fetch dashboard stats:', error);
            return null;
        }
    },
};
