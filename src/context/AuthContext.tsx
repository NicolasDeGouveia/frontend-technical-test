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
  login: (event: React.FormEvent<HTMLFormElement>, nickname: string) => void;
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

        // Check for stored token in localStorage
        const storedToken = localStorage.getItem("userToken");

        if (storedToken) {
          // Simulate token validation and fetch user data based on the token
          const userInDatabase = users.find(
            (user) => user.token === storedToken
          );

          if (userInDatabase) {
            // Set the authenticated user in the state
            setUser(userInDatabase);
          } else {
            // Clear the stored token if user is not found
            localStorage.removeItem("userToken");
          }
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const login = async (
    event: React.FormEvent<HTMLFormElement>,
    nickname: string
  ) => {
    event.preventDefault();
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
