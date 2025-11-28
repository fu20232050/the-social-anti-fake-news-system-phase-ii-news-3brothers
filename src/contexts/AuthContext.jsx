import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCurrentUser, isAuthenticated as checkAuthStatus, logoutUser as logoutService } from '../services/authService.js';

// Create authentication context
const AuthContext = createContext(null);

// Authentication context provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check user authentication status on initialization
  useEffect(() => {
    const initAuth = () => {
      try {
        if (checkAuthStatus()) {
          const currentUser = getCurrentUser();
          setUser(currentUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Failed to initialize authentication status:', error);
        logoutUser();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Update user state after successful login
  const loginSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  // Log out user
  const logoutUser = () => {
    logoutService();
    setUser(null);
    setIsAuthenticated(false);
  };

  // Update user information
  const updateUser = (updatedUserData) => {
    setUser(prevUser => ({
      ...prevUser,
      ...updatedUserData
    }));
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return user && user.role === role;
  };

  // Check if user has admin privileges
  const isAdmin = () => {
    return hasRole('admin');
  };

  // Check if user has member privileges (can post news)
  const isMember = () => {
    return hasRole('member') || isAdmin();
  };

  // Check if user is just a reader
  const isReader = () => {
    return hasRole('reader');
  };

  // Provided context values
  const contextValue = {
    user,
    loading,
    isAuthenticated,
    loginSuccess,
    logoutUser,
    updateUser,
    hasRole,
    isAdmin,
    isMember,
    isReader
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for accessing authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;