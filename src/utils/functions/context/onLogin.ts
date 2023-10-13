import { setCookie } from "cookies-next";
import { User } from "../../../types/user";
import { notifyMsgError, notifyMsgSuccess } from "../../notify/Notify";

  export const onLogin = async (
    allUsers:User[],
    setUser:React.Dispatch<React.SetStateAction<User>>,
    nickname: string
  ) => {
    // Simulate a database lookup based on nickname
    const userInDatabase = allUsers.find((user) => user.nickname === nickname);
    if (userInDatabase) {
      setUser(userInDatabase);
      localStorage.setItem("userToken", userInDatabase.token);
      setCookie("userToken", userInDatabase.token);
      notifyMsgSuccess("Connexion réussi");
    } else if (!userInDatabase) {
      notifyMsgError(`L'utilisateur ${nickname} est introuvable`);
    } else {
      notifyMsgError(
        "Une erreur est survenue lors de la tentative de connexion"
      );
    }
  };