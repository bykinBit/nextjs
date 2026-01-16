import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, authService } from '@/services';
import Cookies from 'js-cookie';

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;

    // Actions
    setAuth: (user: User, token: string) => void;
    logout: () => void;
    initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isAuthenticated: false,

            setAuth: (user, token) => set({
                user,
                token,
                isAuthenticated: true,
            }),

            logout: () => {
                authService.logout();
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                });
            },

            initialize: async () => {
                const token = Cookies.get('token');

                // 如果没有 Cookie，说明没登录或已过期
                if (!token) {
                    get().logout();
                    return;
                }

                // 如果有 Token 但没用户信息，尝试验证
                if (!get().user) {
                    const user = await authService.validate();
                    if (user) {
                        set({ user, token, isAuthenticated: true });
                    } else {
                        get().logout();
                    }
                }
            },
        }),
        {
            name: 'auth-storage', // localStorage key
            // 过滤持久化字段，token 已经在 Cookie 里的，这里主要是持久化用户信息
            partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
        }
    )
);
