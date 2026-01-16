'use client';

import Link from 'next/link';
import { User } from '@/services';

interface UserDetailContentProps {
    user: User;
}

export default function UserDetailContent({ user }: UserDetailContentProps) {
    return (
        <div className="py-8 px-8 max-w-2xl mx-auto">
            <div className="mb-6">
                <Link href="/user/userlist" className="text-blue-500 hover:underline">
                    ← 返回用户列表
                </Link>
            </div>
            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-8">
                <h1 className="text-3xl font-bold mb-6 text-center">用户详情</h1>
                <div className="space-y-4">
                    <div className="flex border-b border-zinc-200 dark:border-zinc-700 pb-3">
                        <span className="w-24 font-semibold text-zinc-600 dark:text-zinc-400">ID:</span>
                        <span>{user.id}</span>
                    </div>
                    <div className="flex border-b border-zinc-200 dark:border-zinc-700 pb-3">
                        <span className="w-24 font-semibold text-zinc-600 dark:text-zinc-400">姓名:</span>
                        <span>{user.name}</span>
                    </div>
                    <div className="flex border-b border-zinc-200 dark:border-zinc-700 pb-3">
                        <span className="w-24 font-semibold text-zinc-600 dark:text-zinc-400">邮箱:</span>
                        <span>{user.email}</span>
                    </div>
                    <div className="flex">
                        <span className="w-24 font-semibold text-zinc-600 dark:text-zinc-400">创建时间:</span>
                        <span>{new Date(user.createdAt).toLocaleString('zh-CN')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
