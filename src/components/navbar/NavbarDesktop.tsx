import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Button from "../generic/Button";

const NavbarDesktop = () => {
  const [userNickname, setUserNickname] = useState<string>("");
  const { login, user, logout } = useAuth();

  return (
    <ul className="items-center hidden md:flex">
      {user && (
        <>
          <li className="mr-4">
            Bienvenue, <span className="font-bold">{user.nickname}</span>
          </li>
          <li onClick={logout}>
            <button className="px-4 py-2 text-blue-500 bg-transparent border border-blue-500 rounded-lg">
              Se déconnecter
            </button>
          </li>
        </>
      )}
      {!user && (
        <>
          <li>
            <form
              onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                login(event, userNickname), setUserNickname("");
              }}
              className="flex"
            >
              <input
                type="text"
                className="px-4 py-2 mr-4 bg-gray-100 border-b border-black outline-none "
                placeholder="Nom d'utilisateur"
                value={userNickname}
                onChange={(e) => setUserNickname(e.target.value)}
              />
              <div>
                <button className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                  Se connecter
                </button>
              </div>
            </form>
          </li>
        </>
      )}
    </ul>
  );
};

export default NavbarDesktop;
