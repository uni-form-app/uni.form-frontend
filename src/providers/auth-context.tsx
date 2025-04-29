import { createContext, useContext, useState, ReactNode } from 'react';
import { decodedUser } from '../App';

interface AuthContextType {
  user: decodedUser | undefined;
  setAuth: (user: decodedUser | undefined) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setAuth] = useState<decodedUser | undefined>(undefined);

  return (
    <AuthContext.Provider value={{ user, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
