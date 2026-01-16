'use client';

import { useState } from 'react';
import { userService, CreateUserInput } from '@/services';

interface AddUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function AddUserModal({ isOpen, onClose, onSuccess }: AddUserModalProps) {
    const [formData, setFormData] = useState<CreateUserInput>({
        name: '',
        email: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const result = await userService.create(formData);

        if (result) {
            setFormData({ name: '', email: '' });
            onSuccess();
            onClose();
        } else {
            setError('创建用户失败，请重试');
        }

        setLoading(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-xl w-full max-w-md mx-4">
                <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-700">
                    <h2 className="text-xl font-bold">新增用户</h2>
                    <button
                        onClick={onClose}
                        className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 text-2xl"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    {error && (
                        <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="name">
                            姓名
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-700"
                            placeholder="请输入姓名"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="email">
                            邮箱
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-700"
                            placeholder="请输入邮箱"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg transition-colors"
                        >
                            取消
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {loading ? '提交中...' : '确认'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
