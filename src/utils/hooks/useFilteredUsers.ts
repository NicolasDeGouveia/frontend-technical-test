import { useAuth } from "../../context/AuthContext";

// Custom hook for filtering users based on current user's name
const useFilteredUsers = (currentUserName: string) => {
  const { allUsers } = useAuth();

  const filteredUsers = allUsers.filter((user) => user.nickname !== currentUserName);

  return filteredUsers;
};

export default useFilteredUsers;