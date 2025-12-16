import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthStore, AuthUser } from "@/types/auth";

// Tài khoản admin demo. Trong thực tế nên lấy từ backend.
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin123",
} as const;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      login: async (username: string, password: string) => {
        // Giả lập call API, có thể thêm delay nếu muốn
        const isAdmin =
          username === ADMIN_CREDENTIALS.username &&
          password === ADMIN_CREDENTIALS.password;

        if (!isAdmin) {
          return false;
        }

        const user: AuthUser = {
          username,
          role: "admin",
        };

        set({ user });
        return true;
      },
      logout: () => {
        set({ user: null });
      },
    }),
    {
      name: "rl-blog-auth",
    }
  )
);
