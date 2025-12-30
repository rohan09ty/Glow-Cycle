import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  cycleLength: number;
  lastPeriodDate: string | null;
  skinType: string | null;
  onboardingComplete: boolean;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("wellness_user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("wellness_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("wellness_user");
    }
  }, [user]);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("wellness_user");
  };

  return (
    <UserContext.Provider value={{ user, setUser, isAuthenticated: !!user, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
