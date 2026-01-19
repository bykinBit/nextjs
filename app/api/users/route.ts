import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
    const users = db.getUsers();
    // 过滤掉密码等敏感信息
    const safeUsers = users.map(({ password, ...user }) => user);

    return NextResponse.json({
        success: true,
        data: safeUsers,
        pagination: {
            total: safeUsers.length,
            page: 1,
            limit: 10,
            pages: 1
        }
    });
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email } = body;

        if (!name || !email) {
            return NextResponse.json({ success: false, message: '名称和邮箱不能为空' }, { status: 400 });
        }

        const newUser = db.addUser({ name, email });
        return NextResponse.json({
            success: true,
            message: '用户创建成功',
            data: newUser
        });
    } catch (error) {
        return NextResponse.json({ success: false, message: '创建失败' }, { status: 500 });
    }
}
