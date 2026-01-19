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
        const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
        const user = db.getUserById(decoded.id);

        if (!user) {
            return NextResponse.json({ success: false, message: '用户不存在' }, { status: 404 });
        }

        const { password, ...safeUser } = user;
        return NextResponse.json({
            success: true,
            data: safeUser
        });
    } catch (error) {
        return NextResponse.json({ success: false, message: '服务器错误' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const authHeader = request.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ success: false, message: '未授权' }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET) as { id: number };

        const body = await request.json();
        const updatedUser = db.updateUser(decoded.id, body);

        if (!updatedUser) {
            return NextResponse.json({ success: false, message: '用户不存在' }, { status: 404 });
        }

        const { password, ...safeUser } = updatedUser;
        return NextResponse.json({
            success: true,
            message: '个人资料更新成功',
            data: safeUser
        });
    } catch (error) {
        return NextResponse.json({ success: false, message: '更新失败' }, { status: 500 });
    }
}
