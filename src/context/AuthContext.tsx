import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { GoogleOAuthProvider, CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  handleGoogleSuccess: (credentialResponse: CredentialResponse) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const GOOGLE_CLIENT_ID = "769405366079-md467ja85jj3jmqk7e6rh53kan3h8q1f.apps.googleusercontent.com"; // Replace with your actual Google Client ID

interface GoogleUser {
  email: string;
  name: string;
  picture: string;
  sub: string;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
    const decoded = jwtDecode<GoogleUser>(credentialResponse.credential!);
    
    const userData: User = {
      id: decoded.sub,
      name: decoded.name,
      email: decoded.email,
      avatar: decoded.picture
    };
    
    login(userData);
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthContext.Provider value={{ user, login, logout, handleGoogleSuccess }}>
        {children}
      </AuthContext.Provider>
    </GoogleOAuthProvider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}