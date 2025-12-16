export type UserRole = "admin" | "member";

export interface AuthUser {
  username: string;
  role: UserRole;
}

export interface AuthStore {
  user: AuthUser | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}
