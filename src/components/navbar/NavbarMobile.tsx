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
        <div className="absolute left-0 right-0 py-4 bg-gray-400 md:hidden top-28">
          <ul className="flex flex-col items-center justify-center w-full px-4">
            {user && (
              <>
                <li className="mb-4">
                  Bienvenue, <span className="font-bold">{user.nickname}</span>
                </li>
                <li>
                  <button
                    className="p-1 border border-black rounded-lg"
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                  >
                    Logout
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
                    className="p-1 border border-black rounded-lg"
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
