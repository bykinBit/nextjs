'use client';

import { useAuthStore } from '@/stores';
import { authService } from '@/services';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HeaderAuth() {
    const router = useRouter();
    const pathname = usePathname();
    const { user, isAuthenticated, logout, initialize } = useAuthStore();
    const [mounted, setMounted] = useState(false);

    // 初始化认证状态
    useEffect(() => {
        setMounted(true);
        initialize();
    }, [initialize]);

    if (!mounted) return null;

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    if (!isAuthenticated) {
        // 如果是在登录页，不显示登录按钮以免重复
        if (pathname === '/login') return null;

        return (
            <Link href="/login" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                登录
            </Link>
        );
    }

    return (
        <div className="flex items-center gap-4">
            <span className="text-zinc-300 text-sm">
                欢迎, <span className="font-medium text-white">{user?.name}</span>
            </span>
            <button
                onClick={handleLogout}
                className="text-zinc-400 hover:text-white transition-colors text-sm border border-zinc-700 px-3 py-1 rounded-md"
            >
                退出
            </button>
        </div>
    );
}
