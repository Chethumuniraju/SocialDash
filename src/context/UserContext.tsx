import React, { createContext, useState, useContext, useEffect } from 'react';
import { getUserProfile } from '../services/api';

interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile();
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      const userData = await getUserProfile();
      setUser(userData);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      localStorage.removeItem('token');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // In a real app, this would make an API call
      // For demo purposes, we'll use hardcoded credentials
      if (username === 'testuser' && password === 'password') {
        const mockUser = {
          id: 1,
          username: 'testuser',
          name: 'Test User',
          email: 'test@example.com',
          role: 'admin',
          avatar: 'https://i.pravatar.cc/150?u=testuser'
        };
        
        setUser(mockUser);
        localStorage.setItem('token', 'mock-jwt-token');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      logout,
      isLoading
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};