import React from "react";
import { useAuth } from "../../context/AuthContext";

const NavbarConnected = () => {
  const { user, logout } = useAuth();
  return (
    <>
      <li className="mr-4">
        Bienvenue, <span className="font-bold">{user.nickname}</span>
      </li>
      <li onClick={logout}>
        <button
          className="px-4 py-2 text-blue-500 bg-transparent border border-blue-500 rounded-lg"
          aria-label="Se déconnecter"
        >
          Se déconnecter
        </button>
      </li>
    </>
  );
};

export default NavbarConnected;
