import React, { useState } from "react";
import BurgerMenu from "../generic/BurgerMenu";
import { useAuth } from "../../context/AuthContext";

const NavbarMobile = () => {
  const [userNickname, setUserNickname] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { login, user, logout } = useAuth();

  return (
    <>
      <BurgerMenu className="md:hidden" setIsOpen={setIsOpen} isOpen={isOpen} />
      {isOpen && (
        <div className="absolute left-0 right-0 z-10 py-4 bg-gray-600 md:hidden top-28">
          <ul className="flex flex-col items-center justify-center w-full px-4">
            {user && (
              <>
                <li className="mb-4">
                  Bienvenue, <span className="font-bold">{user.nickname}</span>
                </li>
                <li>
                  <button
                    className="px-4 py-2 text-blue-500 bg-transparent border border-blue-500 rounded-lg"
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    aria-label="Se Déconnecter"
                  >
                    Se Déconnecter
                  </button>
                </li>
              </>
            )}
            {!user && (
              <li>
                <form
                  onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                    login(event, userNickname),
                      setUserNickname(""),
                      setIsOpen(false);
                  }}
                  className="flex flex-col gap-2"
                >
                  <input
                    type="text"
                    className="px-4 py-2 border-b border-black rounded-lg outline-none"
                    placeholder="Nom d'utilisateur"
                    value={userNickname}
                    onChange={(e) => setUserNickname(e.target.value)}
                  />
                  <button
                    disabled={userNickname.length <= 0}
                    className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                    aria-label="Se Connecter"
                  >
                    Se Connecter
                  </button>
                </form>
              </li>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default NavbarMobile;
