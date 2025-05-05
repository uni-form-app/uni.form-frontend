import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useLocalStorage } from './local-storage';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { get, remove } = useLocalStorage();
  const navigate = useNavigate();

  const logout = () => {
    setUser(null);
    remove('token');
    navigate('/login');
  };

  useEffect(() => {
    const token = get('token'); // O JWT está salvo com a chave 'token'

    if (token) {
      try {
        const decoded: any = jwtDecode(token);

        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
          throw new Error('Token expirado');
        }

        const parsedUser: User = {
          id: decoded.sub,
          username: decoded.username,
          email: decoded.email,
        };

        setUser(parsedUser);
      } catch (error) {
        console.error('Erro ao decodificar token:', error);
        logout();
      }
    } else {
      setUser(null);
      navigate('/login');
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
