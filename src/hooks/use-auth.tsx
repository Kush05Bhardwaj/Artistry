"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Basic User type replacing Firebase User
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  emailVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signup: (email: string, password: string, name?: string) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (data: { displayName?: string; photoURL?: string }) => Promise<void>;
  isEmailVerified: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Password validation
const validatePassword = (password: string): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

// Email validation
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app with MongoDB, you would check a session token or cookie here
    const storedUser = localStorage.getItem('artistry_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  const signup = async (email: string, password: string, name?: string) => {
    if (!validateEmail(email)) throw new Error('Please enter a valid email address');
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) throw new Error(`Password requirements not met:\n${passwordValidation.errors.join('\n')}`);
    
    const newUser: User = { uid: Math.random().toString(36).substring(2, 9), email, displayName: name || null, emailVerified: true };
    localStorage.setItem('artistry_user', JSON.stringify(newUser));
    setUser(newUser);
    return { user: newUser };
  };
  
  const login = async (email: string, password: string) => {
    if (!validateEmail(email)) throw new Error('Please enter a valid email address');
    
    // Simulating success
    const loggedInUser: User = { uid: Math.random().toString(36).substring(2, 9), email, displayName: 'User', emailVerified: true };
    localStorage.setItem('artistry_user', JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    return { user: loggedInUser };
  };

  const logout = async () => {
    localStorage.removeItem('artistry_user');
    setUser(null);
  };
  
  const resetPassword = async (email: string) => {
    console.log("Mock password reset for:", email);
  };
  
  const updateUserProfile = async (data: { displayName?: string; photoURL?: string }) => {
    if (user) {
      const updated = { ...user, displayName: data.displayName || user.displayName };
      localStorage.setItem('artistry_user', JSON.stringify(updated));
      setUser(updated);
    }
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    resetPassword,
    updateUserProfile,
    isEmailVerified: user?.emailVerified ?? false
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
