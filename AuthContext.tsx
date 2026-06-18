import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { api } from '../api/client';

interface AuthContextType {
  token: string | null;
  login: (
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  );

  useEffect(() => {
    if (token) {
      api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common[
        'Authorization'
      ];
    }
  }, [token]);

  const login = async (
    email: string,
    password: string
  ) => {
    const formData = new URLSearchParams();

    formData.append('username', email);
    formData.append('password', password);

    const { data } = await api.post(
      '/auth/login',
      formData,
      {
        headers: {
          'Content-Type':
            'application/x-www-form-urlencoded',
        },
      }
    );

    localStorage.setItem(
      'token',
      data.access_token
    );

    setToken(data.access_token);
  };

  const logout = () => {
    localStorage.removeItem('token');

    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);