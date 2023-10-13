// AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { User } from "../types/user";
import { deleteCookie, setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { notifyMsgError, notifyMsgSuccess } from "../utils/notify/Notify";
import { getFetchUsers } from "../utils/functions/context/getFetchUsers";
import { onLogin } from "../utils/functions/context/onLogin";

type AuthContextType = {
  user: User | null;
  login: (event: React.FormEvent<HTMLFormElement>, nickname: string) => void;
  logout: () => void;
  allUsers: User[];
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]); // State to store all users
  const router = useRouter();

  useEffect(() => {
    // Fetch all users when the component mounts

    getFetchUsers(setAllUsers, setUser);
  }, []);

  const handleLogin = (
    event: React.FormEvent<HTMLFormElement>,
    nickname: string
  ) => {
    event.preventDefault();
    onLogin(allUsers, setUser, nickname);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userToken");
    deleteCookie("userToken");
    router.replace(router.asPath);
  };

  const contextValue: AuthContextType = {
    user,
    login: handleLogin,
    logout,
    allUsers,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
