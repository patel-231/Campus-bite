import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  studentId: string;
  department: string;
  hostelOrBlock: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAdmin: boolean;
  favorites: string[];
  login: (profile?: Partial<UserProfile>) => void;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  setAdminStatus: (status: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'cb_auth_v2';
const FAVORITES_STORAGE_KEY = 'cb_favorites_v2';
const ADMIN_STORAGE_KEY = 'cb_admin_v2';

const DEFAULT_STUDENT_PROFILE: UserProfile = {
  name: 'Student Member',
  email: '2202021000377@silveroakuni.ac.in',
  phone: '+91 97128 71557',
  studentId: '2202021000377',
  department: 'Computer Engineering',
  hostelOrBlock: 'Block A, 3rd Floor',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_STUDENT_PROFILE;
    } catch {
      return DEFAULT_STUDENT_PROFILE;
    }
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem(ADMIN_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : ['prod-vada-pav', 'prod-vanilla-cold-coffee', 'prod-brownie-icecream'];
    } catch {
      return ['prod-vada-pav', 'prod-vanilla-cold-coffee'];
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (err) {
      console.warn('Auth save error:', err);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(ADMIN_STORAGE_KEY, isAdmin.toString());
    } catch (err) {
      console.warn('Admin status save error:', err);
    }
  }, [isAdmin]);

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (err) {
      console.warn('Favorites save error:', err);
    }
  }, [favorites]);

  const login = (customProfile?: Partial<UserProfile>) => {
    setUser({
      ...DEFAULT_STUDENT_PROFILE,
      ...customProfile,
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...updated } : null));
  };

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  const setAdminStatus = (status: boolean) => {
    setIsAdmin(status);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        favorites,
        login,
        logout,
        updateProfile,
        toggleFavorite,
        isFavorite,
        setAdminStatus,
      }}
    >
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
