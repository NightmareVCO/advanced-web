import type { UserSession } from '@lib/utils/auth.utils';
import { create } from 'zustand';

type AuthStore = {
	user: UserSession | null;
	setUser: (user: UserSession | null) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
	user: null,
	setUser: (user) => set({ user }),
}));
