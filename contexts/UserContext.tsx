"use client";
import { User } from "@/types/tableTypes";
import { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction, useEffect, useCallback } from "react";

interface UserContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  getUser: () => void;
  userLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export default function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState<boolean>(true);

  const getUser = useCallback(async () => {
    setUserLoading(true);
    try {
      const res = await fetch("/api/auth/user", {
        next: {
          tags: ["user"],
        },
      });

      if (!res.ok) {
        setUserLoading(false);
        return;
      }

      const data: User = await res.json();

      setUser(data);
      setUserLoading(false);
    } catch (error) {
      console.error(error);
      setUserLoading(false);
    }
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return <UserContext.Provider value={{ user, setUser, getUser, userLoading }}>{children}</UserContext.Provider>;
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
