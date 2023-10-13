import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const NavbarDisconnected = () => {
  const [userNickname, setUserNickname] = useState<string>("");
  const { login } = useAuth();
  return (
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
          <button
            className="px-4 py-2 text-white bg-[#1654b1] rounded-lg hover:bg-blue-600"
            aria-label="Se connecter"
          >
            Se connecter
          </button>
        </div>
      </form>
    </li>
  );
};

export default NavbarDisconnected;
