'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User } from '@/services';
import AddUserModal from './AddUserModal';

interface UserListClientProps {
    initialUsers: User[];
}

export default function UserListClient({ initialUsers }: UserListClientProps) {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSuccess = async () => {
        // 刷新页面以获取最新数据
        window.location.reload();
    };

    return (
        <div className="py-8 px-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">用户列表</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                >
                    <span className="text-xl">+</span>
                    新增用户
                </button>
            </div>

            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-zinc-100 dark:bg-zinc-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold">ID</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">姓名</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">邮箱</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">创建时间</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                className="border-t border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
                            >
                                <td className="px-6 py-4 text-sm">{user.id}</td>
                                <td className="px-6 py-4 text-sm font-medium">{user.name}</td>
                                <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">{user.email}</td>
                                <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">
                                    {new Date(user.createdAt).toLocaleString('zh-CN')}
                                </td>
                                <td className="px-6 py-4">
                                    <Link
                                        href={`/user/userDetail/${user.id}`}
                                        className="text-blue-500 hover:text-blue-600 hover:underline text-sm"
                                    >
                                        查看详情
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <AddUserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleSuccess}
            />
        </div>
    );
}
