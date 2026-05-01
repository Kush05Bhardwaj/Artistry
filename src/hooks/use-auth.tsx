"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useSession, signOut as nextAuthSignOut, signIn as nextAuthSignIn, SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";

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
  loginWithGoogle: () => Promise<any>;
  googleAuthEnabled: boolean;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (data: { displayName?: string; photoURL?: string }) => Promise<void>;
  isEmailVerified: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProviderInner: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const loading = status === "loading";
  
  const user = session?.user ? {
    uid: session.user.id || "",
    email: session.user.email || null,
    displayName: session.user.name || null,
    emailVerified: true,
  } : null;

  const signup = async (email: string, password: string, name?: string) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });
    
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Error occurred during registration");
    }

    return await login(email, password);
  };

  const login = async (email: string, password: string) => {
    const result = await nextAuthSignIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      throw new Error("Invalid credentials");
    }
    
    return result;
  };

  const loginWithGoogle = async () => {
    return await nextAuthSignIn("google", { callbackUrl: "/design" });
  };

  const logout = async () => {
    await nextAuthSignOut({ redirect: false });
    router.push("/login");
    router.refresh();
  };

  const resetPassword = async (email: string) => {
    console.log("Mock password reset for:", email);
  };
  
  const updateUserProfile = async (data: { displayName?: string; photoURL?: string }) => {
    console.log("Mock update profile:", data);
  };

  const value = {
    user,
    loading,
    signup,
    login,
    loginWithGoogle,
    googleAuthEnabled: process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED === "true",
    logout,
    resetPassword,
    updateUserProfile,
    isEmailVerified: user?.emailVerified ?? false
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <SessionProvider>
      <AuthProviderInner>
        {children}
      </AuthProviderInner>
    </SessionProvider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
