'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService, LoginInput } from '@/services';
import { useAuthStore } from '@/stores';

export default function LoginPage() {
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);
    const [formData, setFormData] = useState<LoginInput>({
        name: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const result = await authService.login(formData);

        if (result) {
            setAuth(result.user, result.token);
            router.push('/');
        } else {
            setError('登录失败，请检查账号和密码');
        }

        setLoading(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="flex-1 flex items-center justify-center px-4 py-6">
            <div className="w-full max-w-md">
                <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-xl p-6 border border-zinc-200 dark:border-zinc-700">
                    <h1 className="text-2xl font-bold text-center mb-4">系统登录</h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-2 rounded-lg text-center text-sm border border-red-100 dark:border-red-900/30">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium mb-1.5 text-zinc-700 dark:text-zinc-300" htmlFor="name">
                                账号 / 邮箱
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-700 transition-all outline-none text-sm"
                                placeholder="请输入账号"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1.5 text-zinc-700 dark:text-zinc-300" htmlFor="password">
                                密码
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-700 transition-all outline-none text-sm"
                                placeholder="请输入密码"
                            />
                        </div>

                        <div className="bg-zinc-50 dark:bg-zinc-900/50 p-3 rounded-lg border border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500 flex flex-col gap-1">
                            <p>💡 默认管理员账号: <span className="font-mono text-blue-500">admin</span></p>
                            <p>💡 默认登录密码: <span className="font-mono text-blue-500">123456</span></p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-lg shadow-blue-500/20 text-sm"
                        >
                            {loading ? '正在验证身份...' : '立即登录'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
