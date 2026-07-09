
import { useEffect, useState, type ReactNode } from "react";
import { authService } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import type {
  AuthUser,
  LoginRequest,
  RegisterRequest,
} from "../types/auth.types";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    Promise.resolve().then(() => {
      if (storedToken && storedUser) {
        const user = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(user);
      }
      setIsLoading(false);
    });
  }, []);

  const saveSession = (authToken: string, authUser: AuthUser) => {
    localStorage.setItem("token", authToken);
    localStorage.setItem("user", JSON.stringify(authUser));
    setToken(authToken);
    setUser(authUser);
  };

  const login = async (data: LoginRequest): Promise<void> => {
    const response = await authService.login(data);
    const authUser: AuthUser = {
      userName: response.userName,
      name: response.name,
      rol: response.rol,
    };
    saveSession(response.token, authUser);
  };

  const register = async (data: RegisterRequest): Promise<void> => {
    const response = await authService.register(data);
    const authUser: AuthUser = {
      userName: response.userName,
      name: response.name,
      rol: response.rol,
    };
    saveSession(response.token, authUser);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
