import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = parseInt(params.id);
    const user = db.getUserById(id);

    if (!user) {
        return NextResponse.json({ success: false, message: '未找到用户' }, { status: 404 });
    }

    const { password, ...safeUser } = user;
    return NextResponse.json({
        success: true,
        data: safeUser
    });
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);
        const body = await request.json();
        const updatedUser = db.updateUser(id, body);

        if (!updatedUser) {
            return NextResponse.json({ success: false, message: '用户不存在' }, { status: 404 });
        }

        const { password, ...safeUser } = updatedUser;
        return NextResponse.json({
            success: true,
            message: '更新成功',
            data: safeUser
        });
    } catch (error) {
        return NextResponse.json({ success: false, message: '更新失败' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = parseInt(params.id);
    const success = db.deleteUser(id);

    if (!success) {
        return NextResponse.json({ success: false, message: '用户不存在' }, { status: 404 });
    }

    return NextResponse.json({
        success: true,
        message: '删除成功'
    });
}
