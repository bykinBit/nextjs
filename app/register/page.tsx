'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authService, RegisterInput } from '@/services';

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState<RegisterInput>({
        name: '',
        email: '',
        password: '',
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (formData.password !== confirmPassword) {
            setError('两次输入的密码不一致');
            return;
        }

        if (formData.password.length < 6) {
            setError('密码长度至少为6位');
            return;
        }

        setLoading(true);

        const result = await authService.register(formData);

        if (result) {
            router.push('/login');
        } else {
            setError('注册失败，请稍后重试');
        }

        setLoading(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="flex-1 flex items-center justify-center px-4 py-4">
            <div className="w-full max-w-md">
                <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-xl p-6">
                    <h1 className="text-2xl font-bold text-center mb-4">注册</h1>

                    <form onSubmit={handleSubmit} className="space-y-3">
                        {error && (
                            <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-2 rounded text-center text-sm">
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
                                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-700 transition-colors text-sm"
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
                                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-700 transition-colors text-sm"
                                placeholder="请输入邮箱"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="password">
                                密码
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-700 transition-colors text-sm"
                                placeholder="请输入密码（至少6位）"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">
                                确认密码
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-700 transition-colors text-sm"
                                placeholder="请再次输入密码"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                        >
                            {loading ? '注册中...' : '注册'}
                        </button>
                    </form>

                    <div className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
                        已有账号？{' '}
                        <Link href="/login" className="text-blue-500 hover:text-blue-600 hover:underline">
                            立即登录
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
