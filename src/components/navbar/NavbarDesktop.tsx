import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

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
          <li>
            <button
              onClick={logout}
              className="p-2 border border-black rounded-lg"
            >
              Se Deconnecter
            </button>
          </li>
        </>
      )}
      {!user && (
        <li>
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              login(event, userNickname), setUserNickname("");
            }}
            className="flex"
          >
            <input
              type="text"
              className="px-4 py-2 mr-4 bg-gray-100 border-b border-black outline-none"
              placeholder="Nom d'utilisateur"
              value={userNickname}
              onChange={(e) => setUserNickname(e.target.value)}
            />

            <button
              disabled={userNickname.length <= 0}
              className="p-2 border border-black rounded-lg"
            >
              Se Connecter
            </button>
          </form>
        </li>
      )}
    </ul>
  );
};

export default NavbarDesktop;
