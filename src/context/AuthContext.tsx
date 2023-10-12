// AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { User } from "../types/user";
import { getAllUsers } from "../utils/functions/getAllUsers";

type AuthContextType = {
  user: User | null;
  login: (nickname: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]); // State to store all users

  useEffect(() => {
    // Fetch all users when the component mounts
    const fetchUsers = async () => {
      try {
        const users = await getAllUsers();
        setAllUsers(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  console.log(allUsers);

  const login = async (nickname: string) => {
    // Simulate a database lookup based on nickname
    const userInDatabase = allUsers.find((user) => user.nickname === nickname);
    if (userInDatabase) {
      setUser(userInDatabase);
      localStorage.setItem("userToken", userInDatabase.token);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userToken");
  };

  const contextValue: AuthContextType = {
    user,
    login,
    logout,
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
