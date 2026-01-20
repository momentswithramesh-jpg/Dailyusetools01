
import React, { createContext, useState, useEffect, ReactNode } from 'react';

// Define the User type
interface User {
  username: string;
}

// Define the context value type
interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  signup: (username: string, password: string) => boolean;
}

// Create the context with a default value of undefined
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// For this example, we'll use localStorage for persistence.
const USERS_KEY = 'registeredUsers';
const CURRENT_USER_KEY = 'currentUser';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const storedUser = localStorage.getItem(CURRENT_USER_KEY);
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse current user from localStorage", error);
      return null;
    }
  });

  const [users, setUsers] = useState<Record<string, string>>(() => {
    try {
        const storedUsers = localStorage.getItem(USERS_KEY);
        return storedUsers ? JSON.parse(storedUsers) : {};
    } catch (error) {
        console.error("Failed to parse users from localStorage", error);
        return {};
    }
  });

  useEffect(() => {
    try {
        if (user) {
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        } else {
            localStorage.removeItem(CURRENT_USER_KEY);
        }
    } catch (error) {
        console.error("Failed to set current user in localStorage", error);
    }
  }, [user]);

  useEffect(() => {
    try {
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } catch (error) {
        console.error("Failed to set users in localStorage", error);
    }
  }, [users]);


  const login = (username: string, password: string): boolean => {
    if (users[username] && users[username] === password) {
      const loggedInUser = { username };
      setUser(loggedInUser);
      return true;
    }
    alert('Invalid username or password.');
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const signup = (username: string, password: string): boolean => {
    if (users[username]) {
      alert('Username already exists.');
      return false;
    }
    setUsers(prevUsers => ({ ...prevUsers, [username]: password }));
    alert('Signup successful! Please log in.');
    return true;
  };

  const value = { user, login, logout, signup };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
