"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type AuthUser = {
  name: string;
  email: string;
  role?: "user" | "admin";
};

type StoredUser = AuthUser & {
  password: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  isReady: boolean;
  login: (email: string, password: string, remember: boolean) => Promise<void>;
  register: (payload: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
};

const AUTH_USER_KEY = "likedrama-auth-user";
const AUTH_USERS_KEY = "likedrama-registered-users";

const demoUsers: StoredUser[] = [
  {
    name: "Demo хэрэглэгч",
    email: "demo@likedrama.mn",
    password: "password123",
    role: "user",
  },
  {
    name: "Админ",
    email: "admin@likedrama.mn",
    password: "admin123",
    role: "admin",
  },
];

const AuthContext = createContext<AuthContextValue | null>(null);

function getRegisteredUsers() {
  const rawUsers = localStorage.getItem(AUTH_USERS_KEY);

  if (!rawUsers) {
    return [];
  }

  return JSON.parse(rawUsers) as StoredUser[];
}

function saveRegisteredUsers(users: StoredUser[]) {
  localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
}

function toAuthUser(user: StoredUser): AuthUser {
  return {
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const rawUser = localStorage.getItem(AUTH_USER_KEY);

      if (rawUser) {
        setUser(JSON.parse(rawUser) as AuthUser);
      }

      setIsReady(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const login = useCallback(
    async (email: string, password: string, remember: boolean) => {
      await new Promise((resolve) => window.setTimeout(resolve, 550));

      const normalizedEmail = email.trim().toLowerCase();
      const allUsers = [...demoUsers, ...getRegisteredUsers()];
      const matchedUser = allUsers.find(
        (item) =>
          item.email.toLowerCase() === normalizedEmail &&
          item.password === password,
      );

      if (!matchedUser) {
        throw new Error("Имэйл эсвэл нууц үг буруу байна.");
      }

      const nextUser = toAuthUser(matchedUser);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(nextUser));
      localStorage.setItem("likedrama-remember-me", remember ? "true" : "false");
      setUser(nextUser);
    },
    [],
  );

  const register = useCallback(
    async (payload: { name: string; email: string; password: string }) => {
      await new Promise((resolve) => window.setTimeout(resolve, 650));

      const normalizedEmail = payload.email.trim().toLowerCase();
      const registeredUsers = getRegisteredUsers();
      const allUsers = [...demoUsers, ...registeredUsers];
      const exists = allUsers.some(
        (item) => item.email.toLowerCase() === normalizedEmail,
      );

      if (exists) {
        throw new Error("Энэ имэйлээр бүртгэл үүссэн байна.");
      }

      const storedUser: StoredUser = {
        name: payload.name.trim(),
        email: normalizedEmail,
        password: payload.password,
        role: "user",
      };
      const nextUser = toAuthUser(storedUser);

      saveRegisteredUsers([...registeredUsers, storedUser]);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(nextUser));
      setUser(nextUser);
    },
    [],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_USER_KEY);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isReady,
      login,
      register,
      logout,
    }),
    [isReady, login, logout, register, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
