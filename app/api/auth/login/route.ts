import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { db } from '@/lib/db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, password } = body;

        // 这里的 name 对应文档中的 email/account
        // 模拟原本 5000 端口的逻辑：admin / 123456
        if (name === 'admin' && password === '123456') {
            const user = db.getUserById(1); // 获取管理员用户
            if (!user) {
                return NextResponse.json({ success: false, message: '用户不存在' }, { status: 404 });
            }

            // 生成 JWT
            const token = jwt.sign(
                { id: user.id, name: user.name, email: user.email },
                JWT_SECRET,
                { expiresIn: '24h' }
            );

            const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

            return NextResponse.json({
                success: true,
                message: '登录成功',
                data: {
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        createdAt: user.createdAt
                    },
                    token,
                    expiresAt
                }
            });
        }

        return NextResponse.json({
            success: false,
            message: '账号或密码错误'
        }, { status: 401 });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: '服务器错误'
        }, { status: 500 });
    }
}
