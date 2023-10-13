import { User } from "../../../types/user";
import { getAllUsers } from "../getAllUsers";

export const getFetchUsers = async (setAllUsers:React.Dispatch<React.SetStateAction<User[]>>, setUser: React.Dispatch<React.SetStateAction<User>>) => {
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