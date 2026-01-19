// 通用 API 响应类型
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    pagination?: PaginationInfo;
}

// 分页信息
export interface PaginationInfo {
    total: number;
    page: number;
    limit: number;
    pages: number;
}

// 用户类型
export interface User {
    id: number;
    name: string;
    email: string;
    createdAt: string;
}

// 创建用户输入
export interface CreateUserInput {
    name: string;
    email: string;
}

// 更新用户输入
export interface UpdateUserInput {
    name?: string;
    email?: string;
}

// 登录输入
export interface LoginInput {
    name: string;
    password: string;
}

// 注册输入
export interface RegisterInput {
    name: string;
    email: string;
    password: string;
}

// 认证响应
export interface AuthResponse {
    user: User;
    token: string;
    expiresAt?: string;
}

// 个人资料更新输入
export interface ProfileUpdateInput {
    name?: string;
    email?: string;
}

// 仪表盘统计数据
export interface DashboardStats {
    totalUsers: number;
    activeUsers: number;
    newUsersToday: number;
}
