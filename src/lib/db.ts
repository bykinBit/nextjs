// 模拟数据库
export interface MockUser {
    id: number;
    name: string;
    email: string;
    password?: string;
    createdAt: string;
}

// 初始数据
let users: MockUser[] = [
    { id: 1, name: '管理员', email: 'admin', password: '123456', createdAt: '2026-01-16T08:00:00.000Z' },
    { id: 2, name: '张三', email: 'zhangsan@example.com', createdAt: '2026-01-16T09:30:00.000Z' },
    { id: 3, name: '李四', email: 'lisi@example.com', createdAt: '2026-01-16T10:15:00.000Z' },
];

/**
 * 极简内存数据库
 * 注意：Next.js 在开发模式下模块可能会重载导致数据重置
 * 在生产环境下，API 路由是无状态的，建议实际项目使用 Redis 或文件存储
 */
export const db = {
    getUsers: () => [...users],
    getUserById: (id: number) => users.find(u => u.id === id) || null,
    getUserByEmail: (email: string) => users.find(u => u.email === email) || null,
    addUser: (user: Omit<MockUser, 'id' | 'createdAt'>) => {
        const newUser: MockUser = {
            ...user,
            id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
            createdAt: new Date().toISOString(),
        };
        users.push(newUser);
        return newUser;
    },
    updateUser: (id: number, data: Partial<MockUser>) => {
        const index = users.findIndex(u => u.id === id);
        if (index !== -1) {
            users[index] = { ...users[index], ...data };
            return users[index];
        }
        return null;
    },
    deleteUser: (id: number) => {
        const exists = users.some(u => u.id === id);
        if (exists) {
            users = users.filter(u => u.id !== id);
            return true;
        }
        return false;
    }
};
