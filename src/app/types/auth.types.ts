
export interface LoginRequest {
  userName: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  userName: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  userName: string;
  name: string;
  rol: 'ADMIN' | 'VETERINARIO' | 'RECEPCIONISTA';
}

export interface AuthUser {
  userName: string;
  name: string;
  rol: AuthResponse['rol'];
}

export interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
}
