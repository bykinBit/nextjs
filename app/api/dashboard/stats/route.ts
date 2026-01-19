import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
    const users = db.getUsers();

    // 模拟一些统计逻辑
    const totalUsers = users.length;
    const activeUsers = Math.floor(totalUsers * 0.8); // 假设 80% 活跃
    const newUsersToday = users.filter(u => {
        const today = new Date().toISOString().split('T')[0];
        return u.createdAt.startsWith(today);
    }).length;

    return NextResponse.json({
        success: true,
        data: {
            totalUsers,
            activeUsers,
            newUsersToday
        }
    });
}
