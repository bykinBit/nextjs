import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { db } from '@/lib/db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(request: Request) {
    try {
        const authHeader = request.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ success: false, message: '未授权' }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
            const user = db.getUserById(decoded.id);

            if (!user) {
                return NextResponse.json({ success: false, message: '用户不存在' }, { status: 404 });
            }

            const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

            return NextResponse.json({
                success: true,
                message: '认证有效',
                data: {
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        createdAt: user.createdAt
                    },
                    expiresAt
                }
            });
        } catch (err) {
            return NextResponse.json({ success: false, message: '认证令牌已过期或无效' }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: '服务器错误' }, { status: 500 });
    }
}
